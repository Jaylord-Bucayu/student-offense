import { Module } from '@nestjs/common';
import { OffenceService } from './offence.service';
import { OffenceController } from './offence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offense } from './entities/offence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offense])],
  controllers: [OffenceController],
  providers: [OffenceService],
})
export class OffenceModule {}
