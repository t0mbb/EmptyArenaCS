import { httpClient } from '../utils/HttpClient';

export async function getListAcc() {
  const data = await httpClient.get('/user/listAcc');

  return data
}

export async function getToken(){
  const response = await httpClient.get('/getaccessToken');
  return response
}

// export async funtion deleteAccount(){
//   const 
// }