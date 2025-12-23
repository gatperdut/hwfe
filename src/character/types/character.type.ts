import { CharacterClass } from './character-class.type';

export type Character = {
  name: string;

  class: CharacterClass;

  userId: number;
};
