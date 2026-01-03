import { CharacterClass } from './character-class.type';

export type Character = {
  id: number | undefined;

  name: string;

  class: CharacterClass;

  userId: number;
};
