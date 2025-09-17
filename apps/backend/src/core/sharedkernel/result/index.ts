import { AppError } from './error';
export * from './error';
export class Result<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: AppError,
  ) {}

  static ok(): Result<void>;
  static ok<T>(value: T): Result<T>;
  static ok<T>(value?: T): Result<T | void> {
    return new Result<T | void>(true, value);
  }

  static fail<T>(error?: AppError): Result<T> {
    return new Result<T>(false, undefined, error || AppError.none);
  }

  static from<T>(value: T | null | undefined): Result<T> {
    return value != null
      ? Result.ok(value)
      : Result.fail<T>(AppError.nullValue);
  }

  get isFailure(): boolean {
    return !this.isSuccess;
  }
}
