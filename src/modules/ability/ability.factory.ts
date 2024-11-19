import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';


export enum Action {
  Manage = 'manage', //wilcare for any action
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Create = 'create'
}

export type Subjects = InferSubjects<typeof User> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    //define rules
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.Read, User);
  
    user.role === 'ADMIN' ? can(Action.Manage, 'all') :  (()=> {
        can(Action.Read, User);
        cannot(Action.Create,'all').because('you are not admin');
    })

    return build({
        detectSubjectType:(item) => 
            item.constructor as ExtractSubjectType<Subjects>
        
    })
    
  }
}
