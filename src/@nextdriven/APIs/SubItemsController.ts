import { BaseURL } from '../config';

export const SubItemController = {
  GetSubItemsList: BaseURL + `/api/SubItem/GetSubItemsList`,
  DeleteSubItem: BaseURL + `/api/SubItem/DeleteSubItem`,
  SearchBySubItemName: BaseURL + `/api/SubItem/SearchBySubItemName`,
  SaveSubItem: BaseURL + `/api/SubItem/SaveSubItem`,
  ChangeSubItemActivity: BaseURL + `/api/SubItem/ChangeSubItemActivity`,
  GetSubItemById: BaseURL + `/api/SubItem/GetSubItemById`,

};
