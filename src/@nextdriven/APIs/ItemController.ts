import { BaseURL } from '../config';

export const ItemController = {
  GetNeeds: BaseURL + `/api/Item/GetNeeds`,
  SaveItem: BaseURL + `/api/Item/SaveItem`,
  GetItemDetails: BaseURL + `/api/Item/GetItemDetails`,
  GetItemsList: BaseURL + `/api/Item/GetItemsList`,
  DeletedItem: BaseURL + `/api/Item/DeleteItem`,
  SearchByItemName: BaseURL + `/api/Item/SearchByItemName`,
  GetItemTypesForDDL: BaseURL + `/api/Item/GetItemTypesForDDL`,
  GetCurrenciesForDDL: BaseURL + `/api/Item/GetCurrenciesForDDL`,
  ChangeItemActivity: BaseURL + `/api/Item/ChangeItemActivity`,
};
