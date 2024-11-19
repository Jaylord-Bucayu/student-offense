
import { Injectable, CanActivate, ExecutionContext,Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name)

  //validate the action if pass or not
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.log(AuthGuard.name);
    
  
    this.logger.debug(request);
    return true;
  }
}
