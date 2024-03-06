export interface createUser {
    firstName: string;
    lastName: string;
    username: string;
    password?: string;
    phoneNumber: string;
    email: string;
    organizationID: number;
    userRole : number;
    companyID: number;
    defaultPrinter: string;
    kitchenPrinter: string;
  }