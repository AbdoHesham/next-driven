import { Injectable } from '@angular/core';
import { QuotationsController } from 'src/@nextdriven/APIs/QuataionsController';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {

  constructor(private HttpService: HttpService) {}

  Save(model: any) {
    return this.HttpService.POST(QuotationsController.Save, model);
  }
  GetAll (model: any) {
    return this.HttpService.POST(QuotationsController.GetAll , model);
  }

  Delete(model: any) {
    return this.HttpService.POST(QuotationsController.Delete, model);
  }
  ViewByStatus(model: any) {
    return this.HttpService.POST(QuotationsController.ViewByStatus,model);
  }
  GetNeeds() {
    return this.HttpService.GET(QuotationsController.GetNeeds);
  }
  GetById(param:any) {
    return this.HttpService.GET(QuotationsController.GetById,param);
  }}



