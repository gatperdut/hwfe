import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CampaignNavService {
  private router = inject(Router);

  // TODO this is wrong because of id
  public isManage(): boolean {
    return this.router.url === '/campaign/manage';
  }

  public toManage(id: number): Promise<boolean> {
    return this.router.navigate(['/campaign', id]);
  }
}
