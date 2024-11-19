import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from 'src/modules/ability/ability.factory';
import { RequiredRule, CHECK_ABILITY } from '../decorators/ability.decorator';
import { ForbiddenError } from '@casl/ability';
import { ObjectId } from 'mongodb';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

      const request = context.switchToHttp().getRequest();
      const user = request.user;
      
     

    const signInUser = await this.usersService.findOneEmail(user?.email);
    if (!signInUser.role) {
      throw new ForbiddenException('User does not have department or role assigned.');
    }

  

   // const user = {id: new ObjectId(), role:'USER',lastname:'',firstname:'',middlename:'', email:"", password: 'password',provider:'',fullName:'' };
    
    const ability = this.caslAbilityFactory.defineAbility(signInUser);

    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
      );
      return true;
    } catch (error) {
        if(error instanceof ForbiddenError) {
            throw new ForbiddenException(error.message)
        }

    }
  }
}
