import axios from 'axios';
import queryString from 'query-string';
import { SubscriberAudioInterface, SubscriberAudioGetQueryInterface } from 'interfaces/subscriber-audio';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSubscriberAudios = async (
  query?: SubscriberAudioGetQueryInterface,
): Promise<PaginatedInterface<SubscriberAudioInterface>> => {
  const response = await axios.get('/api/subscriber-audios', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSubscriberAudio = async (subscriberAudio: SubscriberAudioInterface) => {
  const response = await axios.post('/api/subscriber-audios', subscriberAudio);
  return response.data;
};

export const updateSubscriberAudioById = async (id: string, subscriberAudio: SubscriberAudioInterface) => {
  const response = await axios.put(`/api/subscriber-audios/${id}`, subscriberAudio);
  return response.data;
};

export const getSubscriberAudioById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/subscriber-audios/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSubscriberAudioById = async (id: string) => {
  const response = await axios.delete(`/api/subscriber-audios/${id}`);
  return response.data;
};
