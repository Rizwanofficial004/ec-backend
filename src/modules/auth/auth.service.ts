import { HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/create-auth.dto';
import { GlobalResponse } from 'src/common/globalResponse';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { CustomError } from 'src/common/exceptionError';
import { BcryptService } from './bcrypt.service';
import {
  ExceptionsEnum,
  SuccessMsgEnum,
} from 'src/common/enums/error.exception.enum';
import { AuthServices } from 'src/common/services/authServices';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly bcryptService: BcryptService,
    private readonly authServices: AuthServices,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<GlobalResponse> {
    const { email, password } = signUpDto;
    try {
      // Check user exist or not
      const user = await this.userModel.findOne({ email });
      if (user) {
        throw new CustomError(
          `This email ${email} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await this.bcryptService.hash(password);
      const userResponse = await new this.userModel({
        ...signUpDto,
        password: hashedPassword,
      }).save();
      return new GlobalResponse(
        SuccessMsgEnum.USER_CREATED_SUCCESS,
        true,
        userResponse,
      );
    } catch (err) {
      throw err;
    }
  }

  async signIn(signInDto: SignInDto): Promise<GlobalResponse> {
    const { email, password } = signInDto;

    const user = await this.userModel.findOne({ email }).lean();
    if (!user)
      throw new CustomError(ExceptionsEnum.INVALID_USER, HttpStatus.NOT_FOUND);

    const isValidPassword = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isValidPassword)
      throw new CustomError(
        ExceptionsEnum.INVALID_PASSWORD,
        HttpStatus.UNAUTHORIZED,
      );

    const tokens = await this.authServices.getTokens(user);

    // Explicitly cast 'user' to allow deletion
    const userResponse = { ...user, tokens, password: undefined };

    return new GlobalResponse(
      SuccessMsgEnum.USER_LOGGEDIN_SUCCESS,
      true,
      userResponse,
      'user',
    );
  }
}
