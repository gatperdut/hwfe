import { CharacterClass } from '../../../character-aux/types/character-class.type';

export type CharacterAllDto = {
  term: string | undefined;

  class: CharacterClass | undefined;

  userId: number | undefined;
};
