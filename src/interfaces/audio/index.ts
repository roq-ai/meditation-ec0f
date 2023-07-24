import { SeriesAudioInterface } from 'interfaces/series-audio';
import { SubscriberAudioInterface } from 'interfaces/subscriber-audio';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface AudioInterface {
  id?: string;
  title: string;
  category: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  series_audio?: SeriesAudioInterface[];
  subscriber_audio?: SubscriberAudioInterface[];
  organization?: OrganizationInterface;
  _count?: {
    series_audio?: number;
    subscriber_audio?: number;
  };
}

export interface AudioGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  category?: string;
  organization_id?: string;
}
