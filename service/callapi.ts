import { ResultMessageResponse } from "../model/ResultMessageResponse";
import { UnitDTO } from "../model/UnitDTO";
import { VendorDTO } from "../model/VendorDTO";
import axios from 'axios';
import { showNotification } from '@mantine/notifications';
var baseUrl = "http://localhost:5005/api/v1";

export async function loadUnit(): Promise<ResultMessageResponse<UnitDTO>> {
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
export async function loadVendor(): Promise<ResultMessageResponse<VendorDTO>> {
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

