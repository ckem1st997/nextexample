import { BaseModel } from "./BaseModel";

export interface VendorDTO extends BaseModel {
    code: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    contactPerson: string;
    inactive: boolean;
}

export interface WareHouseItemDTO extends BaseModel {
    code: string;
    name: string;
    categoryId: string;
    description: string;
    vendorId: string;
    vendorName: string;
    country: string;
    unitId: string;
    inactive: boolean | null;
}