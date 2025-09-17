import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
  HttpStatus,
} from '@nestjs/common';

import { defaultHttpErrors as _defaultHttpErrors } from './../problems/constants';

import { BASE_PROBLEMS_URI_KEY, HTTP_ERRORS_MAP_KEY } from './constants';
import {
  IErrorDetail,
  IProblemDetail,
} from '../problems/http-exception.interface'; 
import { Response } from 'express';
import { Environment } from '../../../config';

export const PROBLEM_CONTENT_TYPE = 'application/problem+json';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(BASE_PROBLEMS_URI_KEY)
    private readonly baseUri = '',
    @Inject(HTTP_ERRORS_MAP_KEY)
    private readonly defaultHttpErrors = _defaultHttpErrors,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.getStatus(exception);
    const errorResponse = this.getErrorResponse(exception, status);
    const { message, type, errors } = this.extractErrorDetails(errorResponse);

    const body: IProblemDetail = {
      ...errors,
      type: [this.baseUri, type || this.getDefaultType(status)]
        .filter(Boolean)
        .join('/'),
      message,
      status,
    };

    if (Environment.isDev) {
      body['exception'] = this.buildDevError(exception);
    }

    response.status(status).contentType(PROBLEM_CONTENT_TYPE).json(body);
  }

  private getStatus(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrorResponse(
    exception: unknown,
    status: number,
  ): IExceptionResponse {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      return typeof response === 'string'
        ? { message: response, statusCode: status }
        : (response as IExceptionResponse);
    }

    return { message: 'Internal server error', statusCode: status };
  }

  private extractErrorDetails(errorResponse: IExceptionResponse) {
    const message = errorResponse.message;
    let type: string | undefined;
    let errors: Record<string, unknown> = {};
    if (errorResponse.error && typeof errorResponse.error !== 'string') {
      type = errorResponse.error.error?.type;
      errors = { ...errorResponse.error };
    }

    return { message, type, errors };
  }

  private buildDevError(exception: unknown) {
    return {
      name: exception instanceof Error ? exception.name : 'UnknownError',
      stack: exception instanceof Error ? exception.stack : undefined,
      raw: exception,
    };
  }

  private getDefaultType(status: number): string {
    return this.defaultHttpErrors[status];
  }
}

interface IExceptionResponse {
  error?: string | IErrorDetail;
  message: string;
  type?: string;
  instance?: string;
  statusCode: number;
  code?: string;
}
