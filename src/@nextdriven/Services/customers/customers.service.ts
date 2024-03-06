
import { Injectable } from '@angular/core';
import { CustomerController } from 'src/@nextdriven/APIs/CustomerController';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private HttpService: HttpService) {}

  Save(model: any) {
    return this.HttpService.POST(CustomerController.Save, model);
  }
  GetList(model: any) {
    return this.HttpService.POST(CustomerController.GetList, model);
  }
  SearchByName(model: any) {
    return this.HttpService.POST(CustomerController.SearchByName, model);
  }
  Delete(model: any) {
    return this.HttpService.POST(CustomerController.Delete, model);
  }
  ChangeActivity(model: any) {
    return this.HttpService.POST(CustomerController.ChangeActivity,model);
  }
  GetAllForDDL() {
    return this.HttpService.GET(CustomerController.GetAllForDDL);
  }


  GetById(param:any) {
    return this.HttpService.GET(CustomerController.GetById,param);
  }
}
