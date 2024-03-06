import { BaseURL } from '../config';

export const VendorsController = {
  Save: BaseURL + `/api/Order/Vendor/Save`,
  GetAll: BaseURL + `/api/Order/Vendor/GetAll`,
  GetAllForDDL: BaseURL + `/api/Order/Vendor/GetAllForDDL`,
  SearchByName: BaseURL + `/api/Order/Vendor/SearchByName`,
  ChangeActivity: BaseURL + `/api/Order/Vendor/ChangeActivity`,
  Delete: BaseURL + `/api/Order/Vendor/Delete`,
  GetById: BaseURL + `/api/Order/Vendor/GetById`,
};
