import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from '../result';
import { IProblemDetail } from '../problems/http-exception.interface';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((result) => {
        const response = context.switchToHttp().getResponse<Response>();
        if (result instanceof Result) {
          if (result.isFailure) {
            const status = HttpStatus.BAD_REQUEST;
            const problemDetail: IProblemDetail = {
              status,
              message: 'BAD_REQUEST',
              type: 'BAD_REQUEST',
              detail:
                result.error?.description ||
                'Bad Request. Please check the request parameters or try again later.',
              code: result.error?.code,
            };

            response.status(status);
            return problemDetail;
          }

          return result.value as unknown;
        }

        return result as unknown;
      }),
    );
  }
}
