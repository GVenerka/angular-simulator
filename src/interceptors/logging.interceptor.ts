import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const startTime: number = Date.now();
  const logRequest = (status: number): void => {
    const duration: number = Date.now() - startTime;
    console.log(req.method, req.url, status, `${duration} ms`);
  };

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        logRequest(event.status);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      logRequest(error.status);
      return throwError(() => error);
    }),
  );
  
};
