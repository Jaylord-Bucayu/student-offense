import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../common/constants/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleAuthStrategy } from './strategies/google.strategy';
import { FacebookAuthStrategy } from './strategies/facebook.strategy';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtGuard } from 'src/common/guards/jwt.guard';


@Module({
  controllers: [AuthController],
  imports: [
   TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
   
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy,GoogleAuthStrategy,FacebookAuthStrategy
   
  ],
  
})
export class AuthModule {}