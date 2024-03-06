import { BaseURL } from '../config';

export const ExpenseController = {
  Save: BaseURL + `/api/Order/Expense/Save`,
  GetAll: BaseURL + `/api/Order/Expense/GetAll`,
  GetReferenceUsersForDDL:BaseURL + `/api/Order/Expense/GetReferenceUsersForDDL`,
  SearchByReferenceUser: BaseURL + `/api/Order/Expense/SearchByReferenceUser`,
  Delete: BaseURL + `/api/Order/Expense/Delete`,
  GetById: BaseURL + `/api/Order/Expense/GetById`,

  
};
