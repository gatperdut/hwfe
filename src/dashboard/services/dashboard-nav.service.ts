import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardNavService {
  private router = inject(Router);

  public isUsers(): boolean {
    return this.router.url === '/dashboard/users';
  }

  public toUsers(): Promise<boolean> {
    return this.router.navigate(['/dashboard/users']);
  }

  public isCharactersAll(): boolean {
    return this.router.url === '/dashboard/characters-all';
  }

  public toCharactersAll(): Promise<boolean> {
    return this.router.navigate(['/dashboard/characters-all']);
  }

  public isCampaignsAll(): boolean {
    return this.router.url === '/dashboard/campaigns-all';
  }

  public toCampaignsAll(): Promise<boolean> {
    return this.router.navigate(['/dashboard/campaigns-all']);
  }

  public isCharacters(): boolean {
    return this.router.url === '/dashboard/characters';
  }

  public toCharacters(): Promise<boolean> {
    return this.router.navigate(['/dashboard/characters']);
  }

  public isCampaigns(): boolean {
    return this.router.url === '/dashboard/campaigns';
  }

  public toCampaigns(): Promise<boolean> {
    return this.router.navigate(['/dashboard/campaigns']);
  }
}
