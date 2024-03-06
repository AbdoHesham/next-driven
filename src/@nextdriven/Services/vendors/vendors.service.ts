
import { Injectable } from '@angular/core';
import { OrderTypeController } from 'src/@nextdriven/APIs/OrderTypeController';
import { SubItemController } from 'src/@nextdriven/APIs/SubItemsController';
import { UOMController } from 'src/@nextdriven/APIs/UOMController';
import { VendorsController } from 'src/@nextdriven/APIs/VendorsController';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class VendorsService {
  constructor(private HttpService: HttpService) {}

  Save(model: any) {
    return this.HttpService.POST(VendorsController.Save, model);
  }
  GetAll(model: any) {
    return this.HttpService.POST(VendorsController.GetAll, model);
  }
  SearchByName(model: any) {
    return this.HttpService.POST(VendorsController.SearchByName, model);
  }
  Delete(model: any) {
    return this.HttpService.POST(VendorsController.Delete, model);
  }
  ChangeActivity(model: any) {
    return this.HttpService.POST(VendorsController.ChangeActivity,model);
  }
  GetAllForDDL() {
    return this.HttpService.GET(VendorsController.GetAllForDDL);
  }
  GetById(params:any) {
    return this.HttpService.GET(VendorsController.GetById,params);
  }
  
}
