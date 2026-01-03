import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterAllDto } from '../../dashboard/character-all/dto/character-all.dto';
import { CharacterCreateDto } from '../../dashboard/character-create-dialog/dto/character-create.dto';
import { environment } from '../../environments/environment';
import { Paginated } from '../../types/paginated.type';
import { Pagination } from '../../types/pagination.type';
import { dropIrrelevantParams } from '../../utils/drop-irrelevant-params';
import { Character } from '../types/character.type';

@Injectable({ providedIn: 'root' })
export class CharacterApiService {
  private httpClient = inject(HttpClient);

  public all(params: Partial<Pagination & CharacterAllDto>): Observable<Paginated<Character>> {
    return this.httpClient.get<Paginated<Character>>(`${environment.apiUrl}/characters`, {
      params: dropIrrelevantParams(params),
    });
  }

  public create(userId: number, params: CharacterCreateDto): Observable<Character> {
    return this.httpClient.post<Character>(`${environment.apiUrl}/characters`, {
      ...params,
      userId: userId,
    });
  }
}
