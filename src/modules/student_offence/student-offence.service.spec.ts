import { Test, TestingModule } from '@nestjs/testing';
import { StudentOffenceService } from './student-offence.service';

describe('StudentOffenceService', () => {
  let service: StudentOffenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentOffenceService],
    }).compile();

    service = module.get<StudentOffenceService>(StudentOffenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
