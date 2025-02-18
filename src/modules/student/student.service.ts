import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { debug } from 'ps-logger';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = this.studentRepository.create(createStudentDto);
    return await this.studentRepository.save(newStudent);
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Student[]; total: number }> {
    const [data, total] = await this.studentRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ student_id: id });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
   if (!ObjectId.isValid(id)) {
           throw new BadRequestException(`Invalid student offense ID: ${id}`);
       }
   
       const objectId = new ObjectId(id);
   
       console.log({updateStudentDto})
   
       // Check if the student offense exists
       //@ts-ignore
       const existingRecord = await this.studentRepository.findOneBy({ _id: objectId });
       console.log(existingRecord);
       if (!existingRecord) {
           throw new NotFoundException(`Student offense with ID ${id} not found`);
       }
   
       // Perform the update
       //@ts-ignore
       const updatedRecord = await this.studentRepository.findOneAndUpdate(
           { _id: objectId },  // ✅ Fixed: Use `_id`, not `id`
           { $set: updateStudentDto },
           { returnDocument: 'after' }  // ✅ Returns the updated document
       );
   
       if (!updatedRecord) {
           throw new BadRequestException(`Failed to update student offense with ID: ${id}`);
       }
   
       return updatedRecord;
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
}
