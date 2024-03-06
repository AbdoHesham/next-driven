
import { Injectable } from '@angular/core';
import { SubItemController } from 'src/@nextdriven/APIs/SubItemsController';
import { UOMController } from 'src/@nextdriven/APIs/UOMController';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class SubItemService {
  constructor(private HttpService: HttpService) {}

  SaveSubItem(model: any) {
    return this.HttpService.POST(SubItemController.SaveSubItem, model);
  }
  GetSubItemsList(model: any) {
    return this.HttpService.POST(SubItemController.GetSubItemsList, model);
  }
  SearchBySubItemName(model: any) {
    return this.HttpService.POST(SubItemController.SearchBySubItemName, model);
  }
  DeleteSubItem(model: any) {
    return this.HttpService.POST(SubItemController.DeleteSubItem, model);
  }
  ChangeSubItemActivity(model: any) {
    return this.HttpService.POST(SubItemController.ChangeSubItemActivity,model);
  }
  GetSubItemById(param:any) {
    return this.HttpService.GET(SubItemController.GetSubItemById,param);
  }
}
