import { CharacterClass } from '../types/character-class.type';

export type CharacterAllDto = {
  term: string | undefined;

  class: CharacterClass | undefined;

  userId: number | undefined;
};
