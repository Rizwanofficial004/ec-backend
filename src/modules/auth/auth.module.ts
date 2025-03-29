import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';
import { BcryptService } from './bcrypt.service';
import { AuthServices } from 'src/common/services/authServices';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenSchema } from './entities/auth.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, AuthServices, JwtService],
})
export class AuthModule {}
