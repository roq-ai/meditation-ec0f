import { SeriesAudioInterface } from 'interfaces/series-audio';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SeriesInterface {
  id?: string;
  title: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  series_audio?: SeriesAudioInterface[];
  organization?: OrganizationInterface;
  _count?: {
    series_audio?: number;
  };
}

export interface SeriesGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  organization_id?: string;
}
