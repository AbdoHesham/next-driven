import { Injectable } from '@angular/core';
import { CompanyController } from 'src/@nextdriven/APIs/CompanyController';
import { AssignManager } from 'src/@nextdriven/Models/Layout/AssignManager';
import { CompanyActivity } from 'src/@nextdriven/Models/Layout/CompanyActivity';
import { Manager } from 'src/@nextdriven/Models/Layout/CreateManager';
import { GetCompanies } from 'src/@nextdriven/Models/Layout/GetCompanies';
import { SharedDTO } from 'src/@nextdriven/Models/Layout/sharedDTO';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private HttpService: HttpService) {}
  GetNeeds() {
    return this.HttpService.GET(
      CompanyController.GetNeeds
    );
  }
  GetMnagersListToAssign(model: any) {
    return this.HttpService.POST(
      CompanyController.GetMnagersListToAssign,model
    );
  }
  CreateManager(model: any) {
    return this.HttpService.POST(
      CompanyController.CreateManager,
      model
    );
  }
  SaveCompany(model: any) {
    return this.HttpService.POST(
      CompanyController.SaveCompany,
      model
    );
  }
  GetCompanies(model: SharedDTO) {
    return this.HttpService.POST(
      CompanyController.GetCompanies,
      model
    );
  }
  AssignManagerToCompany(model: AssignManager) {
    return this.HttpService.POST(
      CompanyController.AssignManagerToCompany,
      model
    );
  }
  ChangeCompanyActivity(model: CompanyActivity) {
    return this.HttpService.POST(
      CompanyController.ChangeCompanyActivity,
      model
    );
  }

  GetCompanyDetails(model: any) {
    return this.HttpService.POST(
      CompanyController.GetCompanyDetails,
      model
    );
  }
  DeleteCompany(model: any) {
    return this.HttpService.POST(
      CompanyController.DeleteCompany,
      model
    );
  }
  GetAllActiveCompanies(modal:SharedDTO) {
    return this.HttpService.POST(
      CompanyController.GetAllActiveCompanies,modal
    );
  }
  
  GetCompaniesForDDL(model: SharedDTO) {
    return this.HttpService.POST(
      CompanyController.GetCompaniesForDDL,
      model
    );
  }
  UpdateCompanyVATType(model: any) {
    return this.HttpService.POST(
      CompanyController.UpdateCompanyVATType,
      model
    );
  }
  UpdateCompanyLicensePeriod(model: any) {
    return this.HttpService.POST(
      CompanyController.UpdateCompanyLicensePeriod,
      model
    );
  }

}

