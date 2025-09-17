import { HttpStatus } from '@nestjs/common';
import { ErrorType } from './error-type';

export class AppError {
  constructor(
    public readonly code: string,
    public readonly description: string,
    public readonly type: ErrorType = ErrorType.Failure,
  ) {}

  static readonly none = new AppError('', '', ErrorType.Failure);
  static readonly nullValue = new AppError(
    'General.Null',
    'Null value was provided',
    ErrorType.Failure,
  );

  static failure(code: string, description: string) {
    return new AppError(code, description, ErrorType.Failure);
  }

  static validation(code: string, description: string) {
    return new AppError(code, description, ErrorType.Validation);
  }

  static problem(code: string, description: string) {
    return new AppError(code, description, ErrorType.Problem);
  }

  static notFound(code: string, description: string) {
    return new AppError(code, description, ErrorType.NotFound);
  }

  static conflict(code: string, description: string) {
    return new AppError(code, description, ErrorType.Conflict);
  }

  static badRequest() {
    return new AppError(HttpStatus.BAD_REQUEST.toString(), ErrorType.Failure);
  }
}
