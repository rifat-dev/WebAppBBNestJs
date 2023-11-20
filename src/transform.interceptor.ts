import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Res<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Res<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Res<T>> {
    const startTime = performance.now();
    return next.handle().pipe(
      map((data) => {
        const delay = (performance.now() - startTime).toFixed(3);
        return {
          ...data,
          delay: delay,
        };
      }),
    );
  }
}
