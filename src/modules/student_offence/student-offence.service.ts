import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentOffenceDto } from './dto/create-student-offence.dto';
import { UpdateStudentOffenceDto } from './dto/update-student-offence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentOffense } from './entities/student-offence.entity';
import { Repository } from 'typeorm';
import { Student } from '../student/entities/student.entity';
import { ObjectId } from 'mongodb';
import { DateTime } from 'luxon';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class StudentOffenceService {
  constructor(
    @InjectRepository(StudentOffense)
    private readonly studentOffenseRepository: Repository<StudentOffense>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
     private readonly mailerService: MailerService,
  ) {}

  // Create a new student offense
// Create a new student offense
async create(createStudentOffenseDto: CreateStudentOffenceDto): Promise<StudentOffense> {
  try {
    // Log the incoming data
    console.log(createStudentOffenseDto);

    // Extract and process the student_id
    const student_id = createStudentOffenseDto.student_id;

    // Find the student by MongoDB _id
    const student = await this.studentRepository.findOne({
      where: { student_id },
    });

    // Log the found student
    console.log(student);

    // Throw an error if the student does not exist
    if (!student) {
      throw new NotFoundException(`Student with ID ${createStudentOffenseDto.student_id} not found`);
    }

    // Check if an offense with the same student_id and offense_name already exists
    let offense = await this.studentOffenseRepository.findOne({
      where: { student_id: student.id, offense_name: createStudentOffenseDto.offense_name },
    });

    if (offense) {
      // If offense exists, increment the count
      offense.count += 1;
    } else {
      // Create a new offense with count set to 1 if it's the first offense
      offense = this.studentOffenseRepository.create({
        ...createStudentOffenseDto,
        student_id: student.id,
        student_name: `${student.first_name} ${student.middle_initial} ${student.last_name}`,
        section_name: student.section_name,
        count: 1,
        status: "pending",
        grade_level:student.grade_level
      });
    }

    // Send a violation email to the student
    await this.mailerService.sendMail(
      student.email,
      `Reminder: ${offense.offense_name} Violation Notice`,
      `Hello ${offense.student_name}, 
       
      This is a reminder that you have violated the following offense: ${offense.offense_name}.
      
      Please be aware that your service is scheduled at ${offense.service_time} in ${createStudentOffenseDto.location}.
      
      It is important that you attend and complete the service as part of the consequences for this violation.
      
      If you have any questions or need further assistance, please don't hesitate to contact us.`
    );

    // Save the offense in the repository
    return await this.studentOffenseRepository.save(offense);
  } catch (error) {
    // Log the error
    console.error('Error creating student offense:', error);

    // Rethrow the error to allow higher-level error handlers to handle it
    throw error instanceof NotFoundException
      ? error
      : new Error('An unexpected error occurred while creating the student offense');
  }
}

  // Get all student offenses with optional pagination
  async findAll(
    page = 1,
    limit = 200,
    grade_level?: string
  ): Promise<{ data: StudentOffense[]; total: number }> {
    const where: any = {};
  
    if (grade_level) {
      where.grade_level = grade_level;
    }
  
    const [data, total] = await this.studentOffenseRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  
    return { data, total };
  }
  
  
  // Get a single student offense by ID
  async findOne(id: string): Promise<StudentOffense> {
    //@ts-ignore
    const offense = await this.studentOffenseRepository.findOneBy({ id });
    if (!offense) {
      throw new NotFoundException(`Student offense with ID ${id} not found`);
    }
    return offense;
  }

  // Update a student offense by ID
  async update(id: string, updateStudentOffenseDto: UpdateStudentOffenceDto): Promise<StudentOffense> {
    if (!ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid student offense ID: ${id}`);
    }

    const objectId = new ObjectId(id);

    console.log({updateStudentOffenseDto})

    // Check if the student offense exists
    //@ts-ignore
    const existingRecord = await this.studentOffenseRepository.findOneBy({ _id: objectId });
    console.log(existingRecord);
    if (!existingRecord) {
        throw new NotFoundException(`Student offense with ID ${id} not found`);
    }

    // Perform the update
    //@ts-ignore
    const updatedRecord = await this.studentOffenseRepository.findOneAndUpdate(
        { _id: objectId },  // ✅ Fixed: Use `_id`, not `id`
        { $set: updateStudentOffenseDto },
        { returnDocument: 'after' }  // ✅ Returns the updated document
    );

    if (!updatedRecord) {
        throw new BadRequestException(`Failed to update student offense with ID: ${id}`);
    }

    return updatedRecord;
}



  // Delete a student offense by ID
  async remove(id: string): Promise<void> {
    const result = await this.studentOffenseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }


  async findPendingOffenses(): Promise<StudentOffense[]> {
    const today = DateTime.now().startOf('day');

    return await this.studentOffenseRepository.find({
      where: {
        status: 'pending',
        date_of_service: today.toJSDate(), // Ensure the date matches today
      },
    });
  }

  async getTopOffenders(
    page = 1,
    limit = 10
  ): Promise<{ data: StudentOffense[]; total: number }> {
    try {
      // Fetch and count student offenses with pagination and sorting by count in descending order
      const [data, total] = await this.studentOffenseRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: { count: 'DESC', createdAt: 'DESC' }, // Sort by count and fallback to createdAt
      });
  
      return { data, total };
    } catch (error) {
      console.error('Error retrieving top offenders:', error);
      throw new Error('An error occurred while fetching top offenders');
    }
  }
  
  async getOffensesCountByMonth(): Promise<{ data: { month: string; count: number }[], total: number }> {
    // Fetch all offenses from the database
    const offenses = await this.studentOffenseRepository.find();

    // Group and count offenses by year and month
    const offensesByMonth = offenses.reduce((acc, offense) => {
      const date = new Date(offense.date_of_service);
      const month = date.getMonth(); // JavaScript months are 0-based (0 = January, 11 = December)

      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += 1;

      return acc;
    }, {} as Record<number, number>);

    // Month names array to map the month number to the full month name
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Convert the grouped data into the desired format
    const data = Object.entries(offensesByMonth).map(([month, count]) => ({
      month: monthNames[parseInt(month)], // Convert the month number to the month name
      count, // The count of offenses for this month
    }));

    // Calculate the total number of offenses
    const total = offenses.length;

    return { data, total };
  }

  async getOverduePendingOffenses(): Promise<{ data: StudentOffense[]; total: number }> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
    const query: any = {
      status: 'pending',
      date_of_service: { $lte: oneWeekAgo.toISOString() }, // Ensure string comparison
    };
  
    const [data, total] = await this.studentOffenseRepository.findAndCount({
      where: query,
      order: { date_of_service: 'ASC' }, // Ensure correct sorting format
    });
  
    return { data, total };
  }
  
  

}
