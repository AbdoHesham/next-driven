import { OrganizationOwnerInfo } from "./OrganizationOwnerInfo";

export interface CreateEditOrganization{
    id?:number,
    name:string,
    vatNumber:string,
    invoiceNumber:string,
    ownerInfo:OrganizationOwnerInfo
}