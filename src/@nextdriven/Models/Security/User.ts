import { Auditable } from "../Common/Auditable";
import { BaseFilter } from "../Common/BaseFilter";


export class UserDto extends Auditable {
    id?: number;
    firstName: any = null; 
    lastName: any = null;
    address: any = null;
    personalImagePath?: string; 
    ip?: any = null;
    changePassword?: boolean;
    callingCode: any = null;
    jobTitle: any = null;
    status: any = null;
    electronicSignature: any = null;
    nextPasswordExpiryDate: any = null;
    emailVerifiedDate: any = null;
    phoneNumber: any = null; 
    email: any = null;
    emailConfirmed: any = null;
    phoneNumberConfirmed: any = null;

    roleIds?: number[] = [];
    userRoles?: string[] = [];
}

export class UserDetailsDto extends Auditable {
     id: number;
    firstName: any = null; 
    lastName: any = null;
    address: any = null;
    personalImagePath?: string; 
    ip?: any = null;
    changePassword?: boolean;
    callingCode: any = null;
    jobTitle: any = null;
    status: any = null;
    electronicSignature: any = null;
    nextPasswordExpiryDate: any = null;
    emailVerifiedDate: any = null;
    phoneNumber: any = null; 
    email: any = null;
    emailConfirmed: any = null;
    phoneNumberConfirmed: any = null;

    userRoles?: string[] = [];
}

export class UserFilterDto extends BaseFilter{
    name?: any = null;
    email?: any = null;
    status?: any = null;
    roleId?: any = null;
}



