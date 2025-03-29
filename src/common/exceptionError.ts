import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError {
  constructor(
    response: string,
    httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    throw new HttpException(response, httpStatus);
  }
}
