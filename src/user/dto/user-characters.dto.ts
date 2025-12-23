import { CharacterClass } from '../../character/types/character-class.type';

export type UserCharactersDto = {
  term: string | undefined;

  class: CharacterClass | undefined;
};
