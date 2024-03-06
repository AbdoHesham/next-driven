import { BaseURL } from '../config';

export const QuotationsController = {
  GetNeeds: BaseURL + `/api/Customer/CustomerQuotation/GetNeeds`,
  Save: BaseURL + `/api/Customer/CustomerQuotation/Save`,
  GetAll: BaseURL + `/api/Customer/CustomerQuotation/GetAll`,
  ViewByStatus: BaseURL + `/api/Customer/CustomerQuotation/ViewByStatus`,
  Delete: BaseURL + `/api/Customer/CustomerQuotation/Delete`,
  GetById: BaseURL + `/api/Customer/CustomerQuotation/GetById`,
};
