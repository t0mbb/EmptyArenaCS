import { httpClient } from '../../utils/HttpClient';

export async function getListOppo(id : any) {
  const data = await httpClient.get(`/match/listOppo/${id}`);

  return data
}