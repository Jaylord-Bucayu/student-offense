import { Test, TestingModule } from '@nestjs/testing';
import { StudentOffenceController } from './student-offence.controller';
import { StudentOffenceService } from './student-offence.service';

describe('StudentOffenceController', () => {
  let controller: StudentOffenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentOffenceController],
      providers: [StudentOffenceService],
    }).compile();

    controller = module.get<StudentOffenceController>(StudentOffenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
