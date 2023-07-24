const mapping: Record<string, string> = {
  audio: 'audio',
  organizations: 'organization',
  series: 'series',
  'series-audios': 'series_audio',
  'subscriber-audios': 'subscriber_audio',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
