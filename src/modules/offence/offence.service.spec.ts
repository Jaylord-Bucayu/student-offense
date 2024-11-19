import { Test, TestingModule } from '@nestjs/testing';
import { OffenceService } from './offence.service';

describe('OffenceService', () => {
  let service: OffenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffenceService],
    }).compile();

    service = module.get<OffenceService>(OffenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
