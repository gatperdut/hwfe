import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthNavService {
  private router = inject(Router);

  public isLogin(): boolean {
    return this.router.url === '/login';
  }

  public toLogin(): Promise<boolean> {
    return this.router.navigate(['/login']);
  }

  public isRegister(): boolean {
    return this.router.url === '/register';
  }

  public toRegister(): Promise<boolean> {
    return this.router.navigate(['/register']);
  }
}
