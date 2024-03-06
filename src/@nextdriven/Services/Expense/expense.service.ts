import { Injectable } from '@angular/core';
import { ExpenseController } from 'src/@nextdriven/APIs/ExpenseController';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private HttpService: HttpService) {}

  Save(model: any) {
    return this.HttpService.POST(ExpenseController.Save, model);
  }
  GetAll(model: any) {
    return this.HttpService.POST(ExpenseController.GetAll, model);
  }
  SearchByReferenceUser(model: any) {
    return this.HttpService.POST(
      ExpenseController.SearchByReferenceUser,
      model
    );
  }
  Delete(model: any) {
    return this.HttpService.POST(ExpenseController.Delete, model);
  }

  GetReferenceUsersForDDL() {
    return this.HttpService.GET(ExpenseController.GetReferenceUsersForDDL);
  }

  GetById(param: any) {
    return this.HttpService.GET(ExpenseController.GetById, param);
  }
}
