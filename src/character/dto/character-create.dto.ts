import { CharacterClass } from '../types/character-class.type';

export type CharacterCreate = {
  name: string;

  class: CharacterClass;
};
