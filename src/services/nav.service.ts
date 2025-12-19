import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private router: Router = inject(Router);

  public isAuthLogin(): boolean {
    return this.router.url === '/login';
  }

  public toAuthLogin(): Promise<boolean> {
    return this.router.navigate(['/login']);
  }

  public isAuthRegister(): boolean {
    return this.router.url === '/register';
  }

  public toAughRegister(): Promise<boolean> {
    return this.router.navigate(['/register']);
  }

  public isDashboard(): boolean {
    return this.router.url === '/dashboard';
  }

  public toDashboard(): Promise<boolean> {
    return this.router.navigate(['/dashboard']);
  }
}
