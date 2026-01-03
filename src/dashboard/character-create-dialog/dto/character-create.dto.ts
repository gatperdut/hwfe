import { CharacterClass } from '../../../character-aux/types/character-class.type';

export type CharacterCreateDto = {
  name: string;

  class: CharacterClass;
};
