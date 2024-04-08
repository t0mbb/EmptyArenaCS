import { httpClient } from '../utils/HttpClient';

export async function getListOrder() {
  const data = await httpClient.get('/listOrder');

  return data
}
export async function createOrder(input : any){
    const data = await httpClient.post('/createOrder' , input);
    return data
  }


export async function deleteOrder(id : any){
  const response = await httpClient.delete(`/removeOrder/${id}`);
  console.log(response);
  return response
}
export async function findOrder(id : any){
  const response = await httpClient.get(`/findOrder/${id}`);
  console.log(response);
  return response
}
export async function updateOrder(id : any , data : any){
  const response = await httpClient.put(`/updateOrder/${id}` , data);
  console.log(response);
  return response
}





export async function getListOrderItem() {
  const data = await httpClient.get('/listOrderItem');

  return data
}
export async function createOrderItem(input : any){
    const data = await httpClient.post('/createOrderItem' , input);
    return data
  }
export async function deleteOrderItem(id : any){
  const response = await httpClient.delete(`/removeOrderItem/${id}`);
  console.log(response);
  return response
}
export async function findOrderItem(id : any){
  const response = await httpClient.get(`/findOrderItem/${id}`);
  console.log(response);
  return response
}
export async function updateOrderItem(id : any , data : any){
  const response = await httpClient.put(`/updateOrderItem/${id}` , data);
  console.log(response);
  return response
}