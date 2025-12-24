import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paginated } from '../../types/paginated.type';
import { Pagination } from '../../types/pagination.type';
import { dropNullish } from '../../utils/drop-nullish';
import { CharacterCreate } from '../character-create-dialog/dto/character-create.dto';
import { CharacterAllSearchDto } from '../dto/character-all-search.dto';
import { Character } from '../types/character.type';

@Injectable({ providedIn: 'root' })
export class CharacterApiService {
  private httpClient = inject(HttpClient);

  public all(
    params: Partial<Pagination & CharacterAllSearchDto>
  ): Observable<Paginated<Character>> {
    return this.httpClient.get<Paginated<Character>>(`${environment.apiUrl}/characters`, {
      params: dropNullish(params),
    });
  }

  public create(userId: number, params: CharacterCreate): Observable<Character> {
    return this.httpClient.post<Character>(`${environment.apiUrl}/characters`, {
      ...params,
      userId: userId,
    });
  }
}
