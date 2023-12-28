import { IsEmail, IsStrongPassword, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsStrongPassword({ minLength: 6 })
  @IsOptional()
  password: string;
}
