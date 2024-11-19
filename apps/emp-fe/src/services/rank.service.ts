import { httpClient } from '../utils/HttpClient';

export async function getListProduct(id : any) {
  const data = await httpClient.get(`/listProduct/${id}`);

  return data
}


export async function getListRank() {
  const data = await httpClient.get('/rank/listRank');

  return data
}
export async function createRank(input : any){
    const data = await httpClient.post('/rank/create' , input);
    return data
  }
export async function findRank(id : any){
  const response = await httpClient.get(`/rank/find/${id}`);

  return response
}

export async function updateRank(id : any , data : any){
  const response = await httpClient.put(`/rank/update/${id}` , data);

  return response
}

export enum Ranking {
  LvlPRO = 'PRO',
  LvlA = 'A',
  LvlB = 'B',
  LvlC = 'C',
  LvlD = 'D',
  LvlE = 'E',
  LvlF = 'F',
  LvlG = 'G',
  LvlH = 'H',
  UNRANK = 'UNRANK'
}
