import { BaseURL } from '../config';

export const CustomerController = {
  Save: BaseURL + `/api/Order/Customer/Save`,
  GetList: BaseURL + `/api/Order/Customer/GetList`,
  GetAllForDDL: BaseURL + `/api/Order/Customer/GetAllForDDL`,
  SearchByName: BaseURL + `/api/Order/Customer/SearchByName`,
  ChangeActivity: BaseURL + `/api/Order/Customer/ChangeActivity`,
  Delete: BaseURL + `/api/Order/Customer/Delete`,
  GetById: BaseURL + `/api/Order/Customer/GetById`,
};
