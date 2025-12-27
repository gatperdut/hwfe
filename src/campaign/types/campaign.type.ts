import { CampaignPlayer } from '../../campaign-player/types/campaign-player.type';
import { User } from '../../user/types/user.type';

export type Campaign = {
  id: number | undefined;

  name: string;

  masterId: number;

  master?: User;

  players?: CampaignPlayer[];
};
