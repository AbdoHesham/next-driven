import { Injectable } from '@angular/core';
import { OrderTypeController } from 'src/@nextdriven/APIs/OrderTypeController';
import { SubItemController } from 'src/@nextdriven/APIs/SubItemsController';
import { UOMController } from 'src/@nextdriven/APIs/UOMController';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class OrderTypesService {
  constructor(private HttpService: HttpService) {}

  Save(model: any) {
    return this.HttpService.POST(OrderTypeController.Save, model);
  }
  GetAll(model: any) {
    return this.HttpService.POST(OrderTypeController.GetAll, model);
  }
  SearchByName(model: any) {
    return this.HttpService.POST(OrderTypeController.SearchByName, model);
  }
  Delete(model: any) {
    return this.HttpService.POST(OrderTypeController.Delete, model);
  }
  ChangeActivity(model: any) {
    return this.HttpService.POST(OrderTypeController.ChangeActivity,model);
  }
  GetAllForDDL() {
    return this.HttpService.GET(OrderTypeController.GetAllForDDL);
  }
  GetById(param:any) {
    return this.HttpService.GET(OrderTypeController.GetById,param);
  }
}
