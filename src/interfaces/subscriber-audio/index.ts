import { UserInterface } from 'interfaces/user';
import { AudioInterface } from 'interfaces/audio';
import { GetQueryInterface } from 'interfaces';

export interface SubscriberAudioInterface {
  id?: string;
  user_id?: string;
  audio_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  audio?: AudioInterface;
  _count?: {};
}

export interface SubscriberAudioGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  audio_id?: string;
}
