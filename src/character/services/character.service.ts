import { Injectable } from '@angular/core';
import { CharacterCreate } from '../dto/character-create.dto';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  public new(): CharacterCreate {
    return {
      name: '',
      class: 'BARBARIAN',
    };
  }
}
