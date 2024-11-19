import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOffenceDto } from './dto/create-offence.dto';
import { UpdateOffenceDto } from './dto/update-offence.dto';
import { Offense } from './entities/offence.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  async update(id: number, updateOffenseDto: UpdateOffenceDto): Promise<Offense> {
    const offense = await this.findOne(id);
    Object.assign(offense, updateOffenseDto);
    return await this.offenseRepository.save(offense);
  }

  // Delete an offense by ID
  async remove(id: string): Promise<any> {
    return await this.offenseRepository.delete(id);
  }
}
