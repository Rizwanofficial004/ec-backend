import { PartialType } from '@nestjs/mapped-types';
import { SignInDto, SignUpDto } from './create-auth.dto';

export class UpdateSignUpDto extends PartialType(SignUpDto) {}
export class UpdateSignInDto extends PartialType(SignInDto) {}
