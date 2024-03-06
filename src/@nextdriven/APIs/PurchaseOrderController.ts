import { BaseURL } from '../config';

export const PurchaseOrderController = {
  GetNeeds: BaseURL + `/api/Order/PurchaseOrder/GetNeeds`,
  Save: BaseURL + `/api/Order/PurchaseOrder/Save`,
  GetAll: BaseURL + `/api/Order/PurchaseOrder/GetAll`,
  GetDetails: BaseURL + `/api/Order/PurchaseOrder/GetDetails`,
  ViewByStatus: BaseURL + `/api/Order/PurchaseOrder/ViewByStatus`,
  Delete: BaseURL + `/api/Order/PurchaseOrder/Delete`,
  GetVendorsForDDL: BaseURL + `/api/Order/PurchaseOrder/GetVendorsForDDL`,
  GetItemsList: BaseURL + `/api/Order/PurchaseOrder/GetItemsList`,
  GetById: BaseURL + `/api/Order/PurchaseOrder/GetById`,
};
