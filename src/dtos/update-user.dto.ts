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
  Max, IsNotEmpty, IsString, IsOptional,
} from 'class-validator';

export class UpdateUserDto {

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
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  babyBirthDate: string

  @IsOptional()
  onBoardingDone: string

  @IsOptional()
  acceptedPrivacyPolicy: string;


  @IsOptional()
  acceptedTermsAndConditions: string


}