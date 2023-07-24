import axios from 'axios';
import queryString from 'query-string';
import { AudioInterface, AudioGetQueryInterface } from 'interfaces/audio';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAudio = async (query?: AudioGetQueryInterface): Promise<PaginatedInterface<AudioInterface>> => {
  const response = await axios.get('/api/audio', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAudio = async (audio: AudioInterface) => {
  const response = await axios.post('/api/audio', audio);
  return response.data;
};

export const updateAudioById = async (id: string, audio: AudioInterface) => {
  const response = await axios.put(`/api/audio/${id}`, audio);
  return response.data;
};

export const getAudioById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/audio/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAudioById = async (id: string) => {
  const response = await axios.delete(`/api/audio/${id}`);
  return response.data;
};
