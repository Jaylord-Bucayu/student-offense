import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OffenceService } from './offence.service';
import { CreateOffenceDto } from './dto/create-offence.dto';
import { UpdateOffenceDto } from './dto/update-offence.dto';

@Controller('offence')
export class OffenceController {
  constructor(private readonly offenceService: OffenceService) {}

  @Post()
  create(@Body() createOffenceDto: CreateOffenceDto) {
    return this.offenceService.create(createOffenceDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.offenceService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOffenceDto: UpdateOffenceDto) {
    return this.offenceService.update(id, updateOffenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.offenceService.remove(id);
  }
}
