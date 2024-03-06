import { BaseURL } from '../config';

export const OrderTypeController = {
  Save: BaseURL + `/api/Order/OrderType/Save`,
  GetAll: BaseURL + `/api/Order/OrderType/GetAll`,
  GetAllForDDL: BaseURL + `/api/Order/OrderType/GetAllForDDL`,
  SearchByName: BaseURL + `/api/Order/OrderType/SearchByName`,
  ChangeActivity: BaseURL + `/api/Order/OrderType/ChangeActivity`,
  Delete: BaseURL + `/api/Order/OrderType/Delete`,
  GetById: BaseURL + `/api/Order/OrderType/GetById`,

  
};
