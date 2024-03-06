import { BaseURL } from "../config";


export const UserController = {
    CreateUserWithAssignCompany: BaseURL + `/api/Account/SaveUserWithAssignCompany`,
    GetUsersList: BaseURL + `/api/Account/GetUsersList`,
    UpdateUserActivity: BaseURL + `/api/Account/UpdateUserActivity`,
    DeleteUser: BaseURL + `/api/Account/DeleteUser`,
    SearchByRole: BaseURL + `/api/Account/SearchByRole`,
    SearchByCompanyOrUserName: BaseURL + `/api/Account/SearchByCompanyOrUserName`,
    UpdateUserRole: BaseURL + `/api/Account/UpdateUserRole`,
    GetUsersAndCompaniesForDDL: BaseURL + `/api/Account/GetUsersAndCompaniesForDDL`,

    

    
}