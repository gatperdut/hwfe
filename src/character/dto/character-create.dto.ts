import { CharacterClass } from '../types/character-class.type';

export type CharacterCreateDto = {
  name: string;

  class: CharacterClass;
};
