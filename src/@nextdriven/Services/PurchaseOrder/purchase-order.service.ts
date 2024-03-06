
import { Injectable } from '@angular/core';
import { PurchaseOrderController } from 'src/@nextdriven/APIs/PurchaseOrderController';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  constructor(private HttpService: HttpService) {}

  Save(model: any) {
    return this.HttpService.POST(PurchaseOrderController.Save, model);
  }
  GetAll (model: any) {
    return this.HttpService.POST(PurchaseOrderController.GetAll , model);
  }
  GetDetails(model: any) {
    return this.HttpService.POST(PurchaseOrderController.GetDetails, model);
  }
  Delete(model: any) {
    return this.HttpService.POST(PurchaseOrderController.Delete, model);
  }
  ViewByStatus(model: any) {
    return this.HttpService.POST(PurchaseOrderController.ViewByStatus,model);
  }
  GetNeeds() {
    return this.HttpService.GET(PurchaseOrderController.GetNeeds);
  }
  GetVendorsForDDL() {
    return this.HttpService.GET(PurchaseOrderController.GetVendorsForDDL);
  }
  GetItemsList() {
    return this.HttpService.GET(PurchaseOrderController.GetItemsList);
  }
  GetById(param:any) {
    return this.HttpService.GET(PurchaseOrderController.GetById,param);
  }
}

