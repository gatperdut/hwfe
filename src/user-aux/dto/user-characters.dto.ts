import { CharacterClass } from '../../character-aux/types/character-class.type';

export type UserCharactersDto = {
  term: string | undefined;

  class: CharacterClass | undefined;
};
