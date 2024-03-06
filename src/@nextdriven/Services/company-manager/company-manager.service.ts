import { Injectable } from '@angular/core';
import { CompanyManagerController } from 'src/@nextdriven/APIs/CompanyMangerController';
import { UserController } from 'src/@nextdriven/APIs/UsersController';
import { createUser } from 'src/@nextdriven/Models/Layout/createUser';
import { SharedDTO } from 'src/@nextdriven/Models/Layout/sharedDTO';
import { UpdateUserRole } from 'src/@nextdriven/Models/Layout/UpdateUserRole';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyManagerService {
  constructor(private HttpService: HttpService) {}
  SaveUser(model: createUser) {
    return this.HttpService.POST(CompanyManagerController.SaveUser, model);
  }

  GetUsersList(model: any) {
    return this.HttpService.POST(CompanyManagerController.GetUsersList, model);
  }

  UpdateUserActivity(model: any) {
    return this.HttpService.POST(
      CompanyManagerController.UpdateUserActivity,
      model
    );
  }

  DeleteUser(model: any) {
    return this.HttpService.POST(CompanyManagerController.DeleteUser, model);
  }
  UpdateUserRole(model: UpdateUserRole) {
    return this.HttpService.POST(
      CompanyManagerController.UpdateUserRole,
      model
    );
  }

  SearchByCompanyOrUserName(model: any) {
    return this.HttpService.POST(
      CompanyManagerController.SearchByCompanyOrUserName,
      model
    );
  }

  SearchByRole(model: any) {
    return this.HttpService.POST(CompanyManagerController.SearchByRole, model);
  }
  SaveCompanySettings(model: any) {
    return this.HttpService.POST(
      CompanyManagerController.SaveCompanySettings,
      model
    );
  }
  GetCompanySettings() {
    return this.HttpService.GET(CompanyManagerController.GetCompanySettings);
  }
  GetModulesList(model: any) {
    return this.HttpService.POST(
      CompanyManagerController.GetModulesList,
      model
    );
  }
  SaveCustomRole(model: any) {
    return this.HttpService.POST(
      CompanyManagerController.SaveCustomRole,
      model
    );
  }
  GetRolesList(model: any) {
    return this.HttpService.POST(
      CompanyManagerController.GetRolesList,
      model
    );
  }
  GetCustomRolesForDDL() {
    return this.HttpService.GET(CompanyManagerController.GetCustomRolesForDDL);
  }
  GetAssignedModules(model: any) {
    return this.HttpService.POST(
      CompanyManagerController.GetAssignedModules,
      model
    );
  }
  GetNeeds() {
    return this.HttpService.GET(
      CompanyManagerController.GetNeeds
    );
  }
}
