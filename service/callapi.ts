import { ResultMessageResponse } from "../model/ResultMessageResponse";
import { VendorDTO } from "../model/VendorDTO";
import axios from 'axios';
import { showNotification } from '@mantine/notifications';
import { UnitDTO } from './../model/UnitDTO';
var baseUrl = "http://localhost:5005/api/v1";
export const Service = {
  loadUnit,
  loadVendor,
  CreateUnit,
  whItem
};

 async function loadUnit(): Promise<ResultMessageResponse<UnitDTO>> {
  // Call an external API endpoint to get posts
  const res = await axios.get(baseUrl + '/Unit/get-drop-tree?Active=true')
  // .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText)
  //     }
  //     return response.json()
  //   })
  const data = await res.data as Promise<ResultMessageResponse<UnitDTO>>;

  return data;
}
 async function loadVendor(): Promise<ResultMessageResponse<VendorDTO>> {
  // Call an external API endpoint to get posts
  const res = await axios.get(baseUrl + '/Vendor/get-drop-tree?Active=true')
  // .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText)
  //     }
  //     return response.json()
  //   })
  
  const data = await res.data as Promise<ResultMessageResponse<VendorDTO>>;
  return data;
}

async function whItem(): Promise<ResultMessageResponse<VendorDTO>> {
  // Call an external API endpoint to get posts
  const res = await axios.get(baseUrl + '/WareHouseItem/get-drop-tree?Active=true')
  // .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText)
  //     }
  //     return response.json()
  //   })
  
  const data = await res.data as Promise<ResultMessageResponse<VendorDTO>>;
  return data;
}
async function CreateUnit(mode:UnitDTO): Promise<ResultMessageResponse<boolean>> {
  // Call an external API endpoint to get posts
  const res = await axios.post(baseUrl + '/Unit/create',mode)
  // .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText)
  //     }
  //     return response.json()
  //   })
  
  const data = await res.data as Promise<ResultMessageResponse<boolean>>;
  return data;
}

