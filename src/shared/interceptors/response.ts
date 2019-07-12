import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseModel } from '../models/response';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseModel<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseModel<T>> {
    const now = Date.now();
    return next
      .handle()
      .pipe(
        map(data => {
          if (data instanceof ResponseModel) {
            return data;
          }
          return new ResponseModel({
            data,
            success: true,
            message: 'ok',
          })
        }),
        tap(() => console.log(`${context.switchToHttp().getRequest().url} - ${Date.now() - now}ms`)),
      );
  }
}