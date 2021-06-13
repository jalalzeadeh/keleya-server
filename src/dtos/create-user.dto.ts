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

export class CreateUserDto {

  constructor(body) {
    this.email = body.email;
    this.password = body.password;
    this.name = body.name
    this.babyBirthDate = body.babyBirthDate
    this.onBoardingDone = body.onBoardingDone
    this.acceptedPrivacyPolicy = body.acceptedPrivacyPolicy
    this.acceptedTermsAndConditions = body.acceptedTermsAndConditions
  }

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsDateString()
  babyBirthDate: string

  @IsOptional()
  onBoardingDone: string

  @IsOptional()
  acceptedPrivacyPolicy: string;


  @IsOptional()
  acceptedTermsAndConditions: string


}