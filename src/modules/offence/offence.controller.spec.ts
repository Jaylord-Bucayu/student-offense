import { Test, TestingModule } from '@nestjs/testing';
import { OffenceController } from './offence.controller';
import { OffenceService } from './offence.service';

describe('OffenceController', () => {
  let controller: OffenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffenceController],
      providers: [OffenceService],
    }).compile();

    controller = module.get<OffenceController>(OffenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
