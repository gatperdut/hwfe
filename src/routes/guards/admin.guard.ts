import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../user/types/user.type';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean | UrlTree {
    const user: User | null = this.authService.user();

    if (user?.admin) {
      return true;
    }

    return this.router.createUrlTree(['/dashboard', 'users']);
  }
}
