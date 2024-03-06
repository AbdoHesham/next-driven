import { Injectable } from '@angular/core';
import { UserController } from 'src/@nextdriven/APIs/UsersController';
import { createUser } from 'src/@nextdriven/Models/Layout/createUser';
import { SharedDTO } from 'src/@nextdriven/Models/Layout/sharedDTO';
import { UpdateUserRole } from 'src/@nextdriven/Models/Layout/UpdateUserRole';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private HttpService: HttpService) {}
  CreateUserWithAssignCompany(model: createUser) {
    return this.HttpService.POST(
      UserController.CreateUserWithAssignCompany,
      model
    );
  }

  GetUsersList(model: SharedDTO) {
    return this.HttpService.POST(
      UserController.GetUsersList,
      model
    );
  }

  UpdateUserActivity(model: any) {
    return this.HttpService.POST(
      UserController.UpdateUserActivity,
      model
    );
  }

  DeleteUser(model: any) {
    return this.HttpService.POST(
      UserController.DeleteUser,
      model
    );
  }
  UpdateUserRole(model: UpdateUserRole) {
    return this.HttpService.POST(
      UserController.UpdateUserRole,
      model
    );
  }

  SearchByCompanyOrUserName(model: any) {
    return this.HttpService.POST(
      UserController.SearchByCompanyOrUserName,
      model
    );
  }

  SearchByRole(model: any) {
    return this.HttpService.POST(
      UserController.SearchByRole,
      model
    );
  }
  GetUsersAndCompaniesForDDL(model: any) {
    return this.HttpService.POST(
      UserController.GetUsersAndCompaniesForDDL,
      model
    );
  }

  


}
