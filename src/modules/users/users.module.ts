import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from '../ability/ability.module';
import { JwtService } from '@nestjs/jwt';



@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), AbilityModule],
  providers: [
    UsersService,
    JwtService
    
  ],
  exports: [UsersService],
})
export class UsersModule {

}
