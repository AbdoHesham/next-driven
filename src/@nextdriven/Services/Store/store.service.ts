import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { StoreController } from 'src/@nextdriven/APIs/StoreController';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private HttpService: HttpService) { }
  
  SaveWarehouseList(model: any) {
    return this.HttpService.POST(StoreController.SaveWarehouse,model);
  }
  GetWarehouseList(model: any) {
    return this.HttpService.POST(StoreController.GettAllWarehouse, model);
  }
  SearchByWarehouseName(model: any) {
    return this.HttpService.POST(
     StoreController.SearchByWarehouseName,
      model
    );
  }
  DeleteWarehouse(model: any) {
    return this.HttpService.POST(StoreController.DeleteWarehouse,model);
  }
}
