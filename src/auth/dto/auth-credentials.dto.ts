import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_REGEX_ERROR, PASSWORD_VALIDATION_REGEX } from 'src/const/common';

export class AuthCredentialsDto {

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(PASSWORD_VALIDATION_REGEX,
           {message: PASSWORD_REGEX_ERROR})
  password: string;
}
