import { PartialType } from '@nestjs/mapped-types';
import { RegisterIdentityDto } from './register-identity.dto';

export class UpdateIdentityDto extends PartialType(RegisterIdentityDto) {}
