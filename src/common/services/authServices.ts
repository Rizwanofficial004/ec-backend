import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { Token, TokenDocument } from 'src/modules/auth/entities/auth.entity';
// import { Permission } from 'src/modules/permissions/entities/permission.entity';
// import { Role } from 'src/modules/roles/entities/role.entity';
import { CommonEnum } from '../enums/common.enum';
import { ExceptionsEnum } from '../enums/error.exception.enum';
import { CustomError } from '../exceptionError';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthServices {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  async createJwtToken(
    jwtUserInfo: object,
    jwtUserSecrets: object,
  ): Promise<string> {
    return `Bearer ${await this.jwtService.signAsync(jwtUserInfo, jwtUserSecrets)}`;
  }

  async createAccessToken(refreshToken: string): Promise<string> {
    // remove Bearer work from token
    const [_, token] = refreshToken?.split(' ') ?? [];

    try {
      const userInfo = await this.jwtService.verifyAsync(token, {
        secret: 'refresh_secret',
      });
      const tokenRes = await this.tokenModel.findOne({
        where: { userId: userInfo.user.id },
      });

      if (!tokenRes) {
        throw new CustomError(
          ExceptionsEnum.SESSION_EXPIRED,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        const refreshTokenArray = JSON.parse(
          JSON.stringify(tokenRes.refreshToken),
        );
        const isToken = refreshTokenArray.find(
          (token) => token === refreshToken,
        );

        if (isToken) {
          const tokenId = randomUUID();
          const jwtUserInfo = {
            user: userInfo.user,
            tokenId,
          };
          const jwtAccessSecrets = {
            secret: 'asscess_secret',
            // expiresIn: this.jwtConfiguration.accessTokenTtl,
          };
          const accessToken = await this.createJwtToken(
            jwtUserInfo,
            jwtAccessSecrets,
          );
          return accessToken;
        } else
          throw new CustomError(
            ExceptionsEnum.SESSION_EXPIRED,
            HttpStatus.UNAUTHORIZED,
          );
      }
    } catch (err) {
      throw err;
    }
  }

  async getTokens({ _id, role_id, permission_id, email }: any) {
    try {
      const tokenId = randomUUID();

      const jwtUserInfo = {
        user: { _id, email },
        // tokenId,
      };
      const jwtAccessSecrets = {
        secret: 'asscess_secret',
        // expiresIn: this.jwtConfiguration.accessTokenTtl,
      };
      const jwtRefreshSecrets = {
        secret: 'refresh_secret',
        // expiresIn: this.jwtConfiguration.refreshTokenTtl,
      };

      const accessToken = await this.createJwtToken(
        jwtUserInfo,
        jwtAccessSecrets,
      );
      console.log('🚀 ~ AuthServices ~ getTokens ~ accessToken:', accessToken);
      const refreshToken = await this.createJwtToken(
        jwtUserInfo,
        jwtRefreshSecrets,
      );
      console.log(
        '🚀 ~ AuthServices ~ getTokens ~ refreshToken:',
        refreshToken,
      );

      const tokenRes = await this.tokenModel.findOne({
        where: { userId: _id },
      });
      console.log('🚀 ~ AuthServices ~ getTokens ~ tokenRes:', tokenRes);

      if (!tokenRes) {
        const refreshTokenObject = JSON.parse(JSON.stringify([refreshToken]));
        await this.tokenModel.create({
          userId: _id,
          refreshToken: refreshTokenObject,
        });
      } else {
        const refreshTokenArray = JSON.parse(
          JSON.stringify(tokenRes.refreshToken),
        );
        refreshTokenArray.push(refreshToken);
        // await tokenRes.update({ refreshToken: refreshTokenArray });
      }
      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }

  async verifyToken(token, secret) {
    if (!token) {
      throw new CustomError('token has not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      return await this.jwtService.verifyAsync(token, { secret });
    } catch (err) {
      // Handle the error
      if (err.name === 'JsonWebTokenError') {
        console.error('JWT Error:', err.message);
        // Handle specific JWT errors (e.g., 'jwt malformed', 'invalid signature')
        switch (err.message) {
          case 'jwt malformed':
            throw new CustomError(
              'Token seems malformed. Check structure and base64 encoding.',
              HttpStatus.UNAUTHORIZED,
            );
          case 'invalid signature':
            throw new CustomError(
              'Invalid signature. Ensure the correct secret key is used.',
              HttpStatus.UNAUTHORIZED,
            );
          default:
            throw new CustomError(
              `Unknown JWT error: ${err.message}`,
              HttpStatus.UNAUTHORIZED,
            );
        }
      } else {
        console.error('Unexpected error:', err);
        throw new CustomError(`jwt expired ${err}`, HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
