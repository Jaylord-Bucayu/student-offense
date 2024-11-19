import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StudentOffenceService } from './student-offence.service';
import { CreateStudentOffenceDto } from './dto/create-student-offence.dto';
import { UpdateStudentOffenceDto } from './dto/update-student-offence.dto';

@Controller('student-offence')
export class StudentOffenceController {
  constructor(private readonly studentOffenceService: StudentOffenceService) {}

  @Post()
  create(@Body() createStudentOffenceDto: CreateStudentOffenceDto) {
    return this.studentOffenceService.create(createStudentOffenceDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.studentOffenceService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentOffenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentOffenceDto: UpdateStudentOffenceDto) {
    return this.studentOffenceService.update(+id, updateStudentOffenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentOffenceService.remove(+id);
  }
}
