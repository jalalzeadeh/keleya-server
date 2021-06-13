import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max, IsNotEmpty, IsString, IsOptional, IsDateString,
} from 'class-validator';

export class LoginDto {

  constructor(body) {
    this.email = body.email;
    this.password = body.password;
  }

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string;

}