import { ResultMessageResponse } from "../model/ResultMessageResponse";
import { VendorDTO } from "../model/VendorDTO";
import axios from 'axios';
import { showNotification } from '@mantine/notifications';
import { UnitDTO } from './../model/UnitDTO';
import ApiClient from './ApiClient';
import { NextRequest } from 'next/server';
import { GetServerSidePropsContext, NextApiRequest } from "next";
var baseUrl = "http://localhost:5005/api/v1";

const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';


export const Service = {
  loadUnit,
  loadVendor,
  CreateUnit,
  whItem,
  WareHouseItemCategory
};
// debuug https://tymick.me/blog/debug-nextjs-with-vs-code
// crate file copy and paster and F5
async function loadUnit(): Promise<ResultMessageResponse<UnitDTO>> {
  // Call an external API endpoint to get posts
  const res = await axios.get(baseUrl + '/Unit/get-drop-tree?Active=true');
  console.log(res)
  // .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText)
  //     }
  //     return response.json()
  //   })
  const data = await res?.data as Promise<ResultMessageResponse<UnitDTO>>;

  return data;
}
async function loadVendor(): Promise<ResultMessageResponse<VendorDTO>> {
  debugger
  // Call an external API endpoint to get posts
  const res = await axios.get(baseUrl + '/Vendor/get-drop-tree?Active=true')
  console.log(res)
  // .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText)
  //     }
  //     return response.json()
  //   })

  const data = await res?.data as Promise<ResultMessageResponse<VendorDTO>>;
  return data;
}

async function whItem(): Promise<ResultMessageResponse<VendorDTO>> {
  debugger
  // Call an external API endpoint to get posts
  const res = await fetch(server + '/api/item')
  // .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText)
  //     }
  //     return response.json()
  //   })

  const data = await res.json() as Promise<ResultMessageResponse<VendorDTO>>;

  return data;
}


async function WareHouseItemCategory(): Promise<ResultMessageResponse<VendorDTO>> {
  debugger
  // Call an external API endpoint to get posts
  const res = await fetch(server + '/api/wareHouseItemCategory')
  // .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText)
  //     }
  //     return response.json()
  //   })

  const data = await res.json() as Promise<ResultMessageResponse<VendorDTO>>;
  return data;
}


async function CreateUnit(mode: UnitDTO): Promise<ResultMessageResponse<boolean>> {
  // Call an external API endpoint to get posts
  const res = await axios.post(baseUrl + '/Unit/create', mode)
  // .then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.statusText)
  //     }
  //     return response.json()
  //   })

  const data = await res?.data as Promise<ResultMessageResponse<boolean>>;
  return data;
}

export class AxiosCustom {
  req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest | string;
  setApiClient: any;
  constructor(req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest | string) {
    this.req = req;
    this.setApiClient = ApiClient(req);
  }
  async loadUnit(): Promise<ResultMessageResponse<UnitDTO>> {
    // Call an external API endpoint to get posts
    const res = await ApiClient(this.req).get(baseUrl + '/Unit/get-drop-tree?Active=true');
    const data = await res?.data as Promise<ResultMessageResponse<UnitDTO>>;

    return data;
  }
  async loadVendor(): Promise<ResultMessageResponse<VendorDTO>> {
    // Call an external API endpoint to get posts
    const res = await ApiClient(this.req).get(baseUrl + '/Vendor/get-drop-tree?Active=true')
    console.log(res)
    const data = await res?.data as Promise<ResultMessageResponse<VendorDTO>>;
    return data;
  }


  async whItem(): Promise<ResultMessageResponse<VendorDTO>> {
    // Call an external API endpoint to get posts
    const res = await ApiClient(this.req).get(baseUrl + '/WareHouseItem/get-drop-tree?Active=true')

    const data = await res?.data as Promise<ResultMessageResponse<VendorDTO>>;
    return data;
  }


  async WareHouseItemCategory(): Promise<ResultMessageResponse<VendorDTO>> {
    // Call an external API endpoint to get posts
    const res = await ApiClient(this.req).get(baseUrl + '/WareHouseItemCategory/get-drop-tree?Active=true')
    const data = await res?.data as Promise<ResultMessageResponse<VendorDTO>>;
    return data;
  }


  async CreateUnit(mode: UnitDTO): Promise<ResultMessageResponse<boolean>> {
    // Call an external API endpoint to get posts
    const res = await ApiClient(this.req).post(baseUrl + '/Unit/create', mode)
    const data = await res?.data as Promise<ResultMessageResponse<boolean>>;
    return data;
  }
}

