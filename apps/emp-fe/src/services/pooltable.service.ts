import { httpClient } from '../utils/HttpClient';
export enum StatusName {
  AVAILABLE = 'available',
  USED = 'used',
  MAINTAINED = 'maintained',
}

export enum BrandName {
  KKING = 'kking',
  PREDATOR = 'predator',
  AILEEX = 'aileex',
}
export async function getListPoolTable() {
  const data = await httpClient.get('/listPoolTable');

  return data
}
export async function createPoolTable(input : any){
    const data = await httpClient.post('/createPoolTable' , input);
    return data
  }


export async function deletePoolTable(id : any){
  const response = await httpClient.delete(`/removePoolTable/${id}`);
  console.log(response);
  return response
}
export async function findPoolTable(id : any){
  const response = await httpClient.get(`/findPoolTable/${id}`);
  console.log(response);
  return response
}
export async function updatePoolTable(id : any , data : any){
  const response = await httpClient.put(`/updatePoolTable/${id}` , data);
  console.log(response);
  return response
}

export async function startService(id : any) {
  const data = await httpClient.get(`/startService/${id}`);

  return data
}
export async function stopService(id : any) {
  const data = await httpClient.get(`/stopService/${id}`);

  return data
}

