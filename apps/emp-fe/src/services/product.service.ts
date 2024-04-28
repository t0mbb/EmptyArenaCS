import { httpClient } from '../utils/HttpClient';

export async function getListProduct(id : any) {
  const data = await httpClient.get(`/listProduct/${id}`);

  return data
}

export async function createProduct(input : any){
    const data = await httpClient.post('/createProduct' , input);
    return data
  }


export async function deleteProduct(id : any){
  const response = await httpClient.delete(`/removeProduct/${id}`);
  console.log(response);
  return response
}
export async function findProduct(id : any){
  const response = await httpClient.get(`/findProduct/${id}`);
  console.log(response);
  return response
}
export async function findProductbyCatId(id : any){
  const response = await httpClient.get(`/findProductByCatId/${id}`);
  console.log(response);
  return response
}
export async function updateProduct(id : any , data : any){
  const response = await httpClient.put(`/updateProduct/${id}` , data);
  console.log(response);
  return response
}

export async function getListCategory() {
  const data = await httpClient.get('/listCategory');

  return data
}
export async function createCategory(input : any){
    const data = await httpClient.post('/createCategory' , input);
    return data
  }
export async function deleteCategory(id : any){
  const response = await httpClient.delete(`/removeCategory/${id}`);
  console.log(response);
  return response
}
export async function findCategory(id : any){
  const response = await httpClient.get(`/findCategory/${id}`);
  console.log(response);
  return response
}

export async function updateCategory(id : any , data : any){
  const response = await httpClient.put(`/updateCategory/${id}` , data);
  console.log(response);
  return response
}