import { SeriesInterface } from 'interfaces/series';
import { AudioInterface } from 'interfaces/audio';
import { GetQueryInterface } from 'interfaces';

export interface SeriesAudioInterface {
  id?: string;
  series_id?: string;
  audio_id?: string;
  created_at?: any;
  updated_at?: any;

  series?: SeriesInterface;
  audio?: AudioInterface;
  _count?: {};
}

export interface SeriesAudioGetQueryInterface extends GetQueryInterface {
  id?: string;
  series_id?: string;
  audio_id?: string;
}
