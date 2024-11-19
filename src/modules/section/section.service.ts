import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}
  
  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    const section = this.sectionRepository.create(createSectionDto);
    return await this.sectionRepository.save(section);
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Section[]; total: number }> {
    const [data, total] = await this.sectionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

 // Get a single section by ID
  async findOne(id: number): Promise<Section> {
    //@ts-ignore
    const section = await this.sectionRepository.findOneBy({ id });
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return section;
  }
  
 // Update a section by ID
 async update(id: number, updateSectionDto: UpdateSectionDto): Promise<Section> {
  const section = await this.findOne(id);
  Object.assign(section, updateSectionDto);
  return await this.sectionRepository.save(section);
}

  // Delete a section by ID
  async remove(id: number): Promise<void> {
    const section = await this.findOne(id);
    await this.sectionRepository.remove(section);
  }

}
