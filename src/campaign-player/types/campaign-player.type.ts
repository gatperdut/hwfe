import { Character } from '../../character/types/character.type';
import { User } from '../../user/types/user.type';

export type CampaignPlayer = {
  user: User;

  character: Character;
};
