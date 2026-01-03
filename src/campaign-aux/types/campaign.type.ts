import { User } from '../../user-aux/types/user.type';
import { CampaignPlayer } from './campaign-player.type';

export type Campaign = {
  id: number | undefined;

  name: string;

  masterId: number;

  master?: User;

  players?: CampaignPlayer[];
};
