import { httpClient } from '../utils/HttpClient';

export async function getListAcc() {
  const data = await httpClient.get('/user/listAcc');

  return data
}

export async function createAcc(data : any){
  const res = await httpClient.post('/register' , data);
  return res
}

export async function getToken(){
  const response = await httpClient.get('/getaccessToken');
  return response
}


export async function accDetails(id : any){
  const response = await httpClient.get(`/user/find/${id}`);
  return response
}

export async function accDelete(id : any){
  const response = await httpClient.delete(`/user/delete/${id}`);
  console.log(response);
  return response
}
export async function accUpdate(id : any , data:any){
  const response = await httpClient.put(`/user/update/${id}` , data);
 
  return response
}

export async function rePass (id : any , data : any) {
  const res = await httpClient.post(`/repass/${id}` , data);
  return res 
}
export async function google(){
  return await httpClient.get('/auth/google');
}