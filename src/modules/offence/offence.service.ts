import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOffenceDto } from './dto/create-offence.dto';
import { UpdateOffenceDto } from './dto/update-offence.dto';
import { Offense } from './entities/offence.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class OffenceService {
  constructor(
    @InjectRepository(Offense)
    private readonly offenseRepository: Repository<Offense>,
  ) {}

  // Create a new offense
  async create(createOffenseDto: CreateOffenceDto): Promise<Offense> {
    const offense = this.offenseRepository.create(createOffenseDto);
    return await this.offenseRepository.save(offense);
  }

  // Get all offenses with optional pagination
  async findAll(page = 1, limit = 10): Promise<{ data: Offense[]; total: number }> {
    const [data, total] = await this.offenseRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  // Get a single offense by ID
  async findOne(id: number): Promise<Offense> {
    //@ts-ignore
    const offense = await this.offenseRepository.findOneBy({ id });
    if (!offense) {
      throw new NotFoundException(`Offense with ID ${id} not found`);
    }
    return offense;
  }

  // Update an offense by ID
  async update(id: string, updateOffenseDto: UpdateOffenceDto): Promise<Offense> {
   if (!ObjectId.isValid(id)) {
           throw new BadRequestException(`Invalid section offense ID: ${id}`);
       }
   
       const objectId = new ObjectId(id);
   
       // Check if the student offense exists
       //@ts-ignore
       const existingRecord = await this.offenseRepository.findOneBy({ _id: objectId });
       console.log(existingRecord);
       if (!existingRecord) {
           throw new NotFoundException(`Student offense with ID ${id} not found`);
       }
   
       // Perform the update
       //@ts-ignore
       const updatedRecord = await this.offenseRepository.findOneAndUpdate(
           { _id: objectId },  // ✅ Fixed: Use `_id`, not `id`
           { $set: updateOffenseDto },
           { returnDocument: 'after' }  // ✅ Returns the updated document
       );
   
       if (!updatedRecord) {
           throw new BadRequestException(`Failed to update student offense with ID: ${id}`);
       }
   
       return updatedRecord;
  }

  // Delete an offense by ID
  async remove(id: string): Promise<any> {
    return await this.offenseRepository.delete(id);
  }
}
