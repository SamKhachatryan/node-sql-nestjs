import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomException } from '../models/custom-exception';
import { ResponseModel } from '../models/response';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => {
          if (err instanceof CustomException) {
            return of(
              new ResponseModel({
                data    : null,
                success : false,
                message : err.message,
              })
            );
          }
          return throwError(err);
        }),
      );
  }
}
