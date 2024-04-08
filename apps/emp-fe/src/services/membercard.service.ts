import { httpClient } from '../utils/HttpClient';
export enum MemberType {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  DIAMOND = 'diamond'
}




export async function getListMemberCard(id : any) {
  const data = await httpClient.get(`/listMemberCard/${id}`);

  return data
}
export async function createMemberCard(input : any){
    const data = await httpClient.post('/createMemberCard' , input);
    return data
  }


export async function deleteMemberCard(id : any){
  const response = await httpClient.delete(`/removeMemberCard/${id}`);
  console.log(response);
  return response
}
export async function findMemberCard(id : any){
  const response = await httpClient.get(`/findMemberCard/${id}`);
  console.log(response);
  return response
}
export async function updateMemberCard(id : any , data : any){
  const response = await httpClient.put(`/updateMemberCard/${id}` , data);
  console.log(response);
  return response
}

export async function getListMemberType() {
  const data = await httpClient.get('/listMemberType');

  return data
}
export async function createMemberType(input : any){
    const data = await httpClient.post('/createMemberType' , input);
    return data
  }
export async function deleteMemberType(id : any){
  const response = await httpClient.delete(`/removeMemberType/${id}`);
  console.log(response);
  return response
}
export async function findMemberType(id : any){
  const response = await httpClient.get(`/findMemberType/${id}`);
  console.log(response);
  return response
}
export async function updateMemberType(id : any , data : any){
  const response = await httpClient.put(`/updateMemberType/${id}` , data);
  console.log(response);
  return response
}