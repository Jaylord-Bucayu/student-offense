import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

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
 async update(id: string, updateSectionDto: UpdateSectionDto): Promise<Section> {
 if (!ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid section offense ID: ${id}`);
    }

    const objectId = new ObjectId(id);

    console.log(updateSectionDto)

    // Check if the student offense exists
    //@ts-ignore
    const existingRecord = await this.sectionRepository.findOneBy({ _id: objectId });
    console.log(existingRecord);
    if (!existingRecord) {
        throw new NotFoundException(`Student offense with ID ${id} not found`);
    }

    // Perform the update
    //@ts-ignore
    const updatedRecord = await this.sectionRepository.findOneAndUpdate(
        { _id: objectId },  // ✅ Fixed: Use `_id`, not `id`
        { $set: updateSectionDto },
        { returnDocument: 'after' }  // ✅ Returns the updated document
    );

    if (!updatedRecord) {
        throw new BadRequestException(`Failed to update student offense with ID: ${id}`);
    }

    return updatedRecord;
}

  // Delete a section by ID
  async remove(id: number): Promise<void> {
    const section = await this.findOne(id);
    await this.sectionRepository.remove(section);
  }

}
