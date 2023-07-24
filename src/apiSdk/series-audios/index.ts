import axios from 'axios';
import queryString from 'query-string';
import { SeriesAudioInterface, SeriesAudioGetQueryInterface } from 'interfaces/series-audio';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSeriesAudios = async (
  query?: SeriesAudioGetQueryInterface,
): Promise<PaginatedInterface<SeriesAudioInterface>> => {
  const response = await axios.get('/api/series-audios', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSeriesAudio = async (seriesAudio: SeriesAudioInterface) => {
  const response = await axios.post('/api/series-audios', seriesAudio);
  return response.data;
};

export const updateSeriesAudioById = async (id: string, seriesAudio: SeriesAudioInterface) => {
  const response = await axios.put(`/api/series-audios/${id}`, seriesAudio);
  return response.data;
};

export const getSeriesAudioById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/series-audios/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSeriesAudioById = async (id: string) => {
  const response = await axios.delete(`/api/series-audios/${id}`);
  return response.data;
};
