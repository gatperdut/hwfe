import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokenService } from './services/auth-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authTokenService: AuthTokenService = inject(AuthTokenService);

  private excludedUrls: string[] = ['/auth/login', '/auth/register'];

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.authTokenService.get();

    if (!token || this.excludedUrls.some((url: string): boolean => req.url.includes(url))) {
      return next.handle(req);
    }

    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }
}
