import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { googleAuthConstant } from '../../../common/constants/constants';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GoogleAuthStrategy.name);

  constructor(private readonly authService: AuthService) {
    super(googleAuthConstant);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    this.logger.log({ accessToken, refreshToken, profile });

    this.authService.validateGoogle({
      email: profile.emails[0].value,
      provider: 'google',
    });
  }
}
