import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterIdentityDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  confirm_password: string;
}
