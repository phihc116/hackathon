import { Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './sharedkernel/exception-filters/http-exception.filter';
import { ResultInterceptor } from './sharedkernel/interceptors/result.interceptor';
import { BASE_PROBLEMS_URI, HTTP_ERRORS_MAP, HTTP_EXCEPTION_FILTER } from './sharedkernel/exception-filters/http-exception.providers';

 
const globalProvider: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ResultInterceptor,
  },
];

@Module({
  imports: [

  ],
  providers: [
    ...globalProvider,  
    BASE_PROBLEMS_URI,
    HTTP_ERRORS_MAP,
    HTTP_EXCEPTION_FILTER,
  ],
  exports: [
    BASE_PROBLEMS_URI,
    HTTP_ERRORS_MAP,
    HTTP_EXCEPTION_FILTER,
  ],
})
export class CoreModule {}
