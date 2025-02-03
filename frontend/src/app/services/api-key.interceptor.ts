import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'access-key': environment.apiKey, //correct way is to use proxy avoid showing key in the browser
      'Content-Type': 'application/json',
    },
  });

  return next(modifiedReq);
};
