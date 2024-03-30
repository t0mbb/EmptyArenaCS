import { httpClient } from '../utils/HttpClient';

export async function getListAcc() {
  const data = await httpClient.get('/user/listAcc');
  console.log(data);
  return data
}