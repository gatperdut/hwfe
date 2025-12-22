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
    return this.router.url.startsWith('/dashboard');
  }

  public isDashboardUsers(): boolean {
    return this.router.url === '/dashboard/users';
  }

  public toDashboardUsers(): Promise<boolean> {
    return this.router.navigate(['/dashboard/users']);
  }

  public isDashboardCharacters(): boolean {
    return this.router.url === '/dashboard/characters';
  }

  public toDashboardCharacters(): Promise<boolean> {
    return this.router.navigate(['/dashboard/characters']);
  }
}
