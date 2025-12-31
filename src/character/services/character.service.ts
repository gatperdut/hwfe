import { Injectable } from '@angular/core';
import { CharacterCreateDto } from '../dto/character-create.dto';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  public new(): CharacterCreateDto {
    return {
      name: '',
      class: 'BARBARIAN',
    };
  }
}
