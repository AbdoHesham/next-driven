export class Auditable {
    //id?: number = 0;
    isDeleted: boolean = false;
    createdBy: number;
    createdOn?: string = new Date().toISOString();
    updatedBy?: number;
    updatedOn?: string;
  }
  