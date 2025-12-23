import { CharacterClass } from '../types/character-class.type';

export type CharacterAllSearchDto = {
  term: string | undefined;

  class: CharacterClass | undefined;

  userId: number | undefined;
};
