import { PartialType } from '@nestjs/mapped-types';
import { CreateOffenceDto } from './create-offence.dto';

export class UpdateOffenceDto extends PartialType(CreateOffenceDto) {}
