import { BaseURL } from "../config";


export const CompanyController = {
    GetNeeds: BaseURL + `/api/Company/GetNeeds`,
    CreateManager: BaseURL + `/api/Company/CreateManager`,
    GetMnagersListToAssign: BaseURL + `/api/Company/GetMnagersListToAssign`,
    SaveCompany: BaseURL + `/api/Company/SaveCompany`,
    GetCompanies: BaseURL + `/api/Company/GetCompanies`,
    AssignManagerToCompany: BaseURL + `/api/Company/AssignManagerToCompany`,
    ChangeCompanyActivity: BaseURL + `/api/Company/ChangeCompanyActivity`,
    GetCompanyDetails: BaseURL + `/api/Company/GetCompanyDetails`,
    DeleteCompany: BaseURL + `/api/Company/DeleteCompany`,
    SearchByCompanyName: BaseURL + `/api/Company/SearchByCompanyName`,
    GetCompaniesForDDL: BaseURL + `/api/Company/GetCompaniesForDDL`,
    GetAllActiveCompanies: BaseURL + `/api/Company/GetAllActiveCompanies`,
    UpdateCompanyVATType: BaseURL + `/api/Company/UpdateCompanyVATType`,
    UpdateCompanyLicensePeriod: BaseURL + `/api/Company/UpdateCompanyLicensePeriod`,

}