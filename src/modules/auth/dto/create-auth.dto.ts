import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'fullname',
    description: 'full name of user',
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: '+923041493401',
    description: 'phone no of user',
  })
  @IsNotEmpty()
  phoneNo: string;

  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'Email of user',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of user',
  })
  // @MinLength(8, {
  //   message: 'password too short',
  // })
  // @MaxLength(20, {
  //   message: 'password too long',
  // })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  @IsNotEmpty()
  password: string;
}

export class SignInDto {
  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'gmain of user',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of user',
  })
  // @MinLength(8, {
  //   message: 'password too short',
  // })
  // @MaxLength(20, {
  //   message: 'password too long',
  // })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  @IsNotEmpty()
  password: string;
}
