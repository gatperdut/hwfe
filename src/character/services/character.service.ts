import { Injectable } from '@angular/core';
import { Character } from '../types/character.type';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  public empty(userId: number): Character {
    return {
      name: '',
      class: 'BARBARIAN',
      userId: userId,
    };
  }
}
