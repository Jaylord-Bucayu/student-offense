import { PipeTransform, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
  private readonly logger = new Logger(FreezePipe.name);

  transform(value: any) {
    Object.freeze(value);
    this.logger.debug('Freeze pipe running...');
    return value;
  }
}
