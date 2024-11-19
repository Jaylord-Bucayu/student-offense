import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentOffenceDto } from './dto/create-student-offence.dto';
import { UpdateStudentOffenceDto } from './dto/update-student-offence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentOffense } from './entities/student-offence.entity';
import { Repository } from 'typeorm';
import { Student } from '../student/entities/student.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class StudentOffenceService {
  constructor(
    @InjectRepository(StudentOffense)
    private readonly studentOffenseRepository: Repository<StudentOffense>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // Create a new student offense
// Create a new student offense
async create(createStudentOffenseDto: CreateStudentOffenceDto): Promise<StudentOffense> {
  // Convert the student_id to ObjectId if needed
  const student_id = createStudentOffenseDto.student_id;

  // Find the student by MongoDB _id
  const student = await this.studentRepository.findOne({
    where: { student_id },
  });


  console.log(student)
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
      student_name:`${student.first_name} ${student.middle_initial} ${student.last_name}`,
      section_name:student.section_name,
      count: 1,
    });
  }

  // Save the offense in the repository
  return await this.studentOffenseRepository.save(offense);
}
  // Get all student offenses with optional pagination
  async findAll(page = 1, limit = 10): Promise<{ data: StudentOffense[]; total: number }> {
    const [data, total] = await this.studentOffenseRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  
    return { data, total };
  }
  
  // Get a single student offense by ID
  async findOne(id: number): Promise<StudentOffense> {
    //@ts-ignore
    const offense = await this.studentOffenseRepository.findOneBy({ id });
    if (!offense) {
      throw new NotFoundException(`Student offense with ID ${id} not found`);
    }
    return offense;
  }

  // Update a student offense by ID
  async update(id: number, updateStudentOffenseDto: UpdateStudentOffenceDto): Promise<StudentOffense> {
    const offense = await this.findOne(id);
    Object.assign(offense, updateStudentOffenseDto);
    return await this.studentOffenseRepository.save(offense);
  }

  // Delete a student offense by ID
  async remove(id: number): Promise<void> {
    const offense = await this.findOne(id);
    await this.studentOffenseRepository.remove(offense);
  }
}
