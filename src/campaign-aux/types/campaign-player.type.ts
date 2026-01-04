import { Character } from '../../character-aux/types/character.type';
import { User } from '../../user-aux/types/user.type';

export type CampaignPlayer = {
  userId: number;

  user: User;

  characterId: number;

  character: Character;
};
