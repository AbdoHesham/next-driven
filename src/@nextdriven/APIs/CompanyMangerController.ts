import { BaseURL } from '../config';

export const CompanyManagerController = {
  SaveUser: BaseURL + `/api/CompanyManager/SaveUser`,
  GetUsersList: BaseURL + `/api/CompanyManager/GetUsersList`,
  UpdateUserActivity: BaseURL + `/api/CompanyManager/UpdateUserActivity`,
  DeleteUser: BaseURL + `/api/CompanyManager/DeleteUser`,
  SearchByRole: BaseURL + `/api/CompanyManager/GetUsersByRole`,
  SearchByCompanyOrUserName: BaseURL + `/api/CompanyManager/SearchByUserName`,
  UpdateUserRole: BaseURL + `/api/CompanyManager/UpdateUserRole`,
  SaveCompanySettings: BaseURL + `/api/CompanyManager/SaveCompanySettings`,
  GetCompanySettings: BaseURL + `/api/CompanyManager/GetCompanySettings`,
  GetModulesList: BaseURL + `/api/CompanyManager/GetModulesList`,
  SaveCustomRole: BaseURL + `/api/CompanyManager/SaveCustomRole`,
  GetRolesList: BaseURL + `/api/CompanyManager/GetRolesList`,
  GetCustomRolesForDDL: BaseURL + `/api/CompanyManager/GetCustomRolesForDDL`,
  GetAssignedModules: BaseURL + `/api/CompanyManager/GetAssignedModules`,
  GetNeeds: BaseURL + `/api/CompanyManager/GetNeeds`,

};
