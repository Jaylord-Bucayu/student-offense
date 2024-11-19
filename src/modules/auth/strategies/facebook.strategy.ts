import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy,Profile} from 'passport-facebook';
import { AuthService } from "../auth.service";
import { facebookAuthConstant } from "../../../common/constants/constants";

@Injectable()
export class FacebookAuthStrategy extends PassportStrategy(Strategy, "facebook"){

    private readonly logger = new Logger(FacebookAuthStrategy.name);
    constructor(private readonly authService: AuthService) {
        super(facebookAuthConstant);
      }


      async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        
      ): Promise<any> {
        const { name, emails } = profile;
        this.logger.log(name,emails);
        
        // const user = {
        //   email: emails[0].value,
        //   firstName: name.givenName,
        //   lastName: name.familyName,
        // };
        // const payload = {
        //   user,
        //   accessToken,
        // };

        this.authService.validateGoogle({
             email: emails[0].value,
            provider: 'facebook',
          });

      }

      
}