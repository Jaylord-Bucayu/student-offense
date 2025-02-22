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
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('gradeLevel') gradeLevel?: string
  ) {
    return this.studentOffenceService.findAll(Number(page), Number(limit), gradeLevel);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentOffenceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentOffenceDto: UpdateStudentOffenceDto) {
    return this.studentOffenceService.update(id, updateStudentOffenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentOffenceService.remove(id);
  }

  @Get('top/offender')
  getTopOffenders() {
    return this.studentOffenceService.getTopOffenders();
  }

  @Get('get/counts-by-month')
  async getOffensesCountsByMonth() {
    return await this.studentOffenceService.getOffensesCountByMonth();
  }

  @Get('get/pending-week')
  async getOverduePendingOffenses() {
    return await this.studentOffenceService.getOverduePendingOffenses();
  }

}
