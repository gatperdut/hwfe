import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private router: Router = inject(Router);

  public authLogin(): Promise<boolean> {
    return this.router.navigate(['/login']);
  }

  public aughRegister(): Promise<boolean> {
    return this.router.navigate(['/register']);
  }

  public dashMain(): Promise<boolean> {
    return this.router.navigate(['/dashboard']);
  }
}
