import { HttpException, HttpStatus } from '@nestjs/common';

export class InfrastructureException extends HttpException {
  constructor(
    message: string = 'InfrastructureException',
    code: number = HttpStatus.BAD_REQUEST,
  ) {
    super(message, code);
  }
}
