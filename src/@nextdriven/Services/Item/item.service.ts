import { Injectable } from '@angular/core';
import { ItemController } from 'src/@nextdriven/APIs/ItemController';
import { UOMController } from 'src/@nextdriven/APIs/UOMController';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private HttpService: HttpService) {}

  SaveItem(model: any) {
    return this.HttpService.POST(ItemController.SaveItem, model);
  }
  GetItemsList(model: any) {
    return this.HttpService.POST(ItemController.GetItemsList, model);
  }
  SearchByItemName(model: any) {
    return this.HttpService.POST(ItemController.SearchByItemName, model);
  }
  DeletedItem(model: any) {
    return this.HttpService.POST(ItemController.DeletedItem, model);
  }
  GetItemDetails(model: any) {
    return this.HttpService.POST(ItemController.GetItemDetails,model);
  }
  GetCurrenciesForDDL() {
    return this.HttpService.GET(ItemController.GetCurrenciesForDDL);
  }
  GetItemTypesForDDL() {
    return this.HttpService.GET(ItemController.GetItemTypesForDDL);
  }
  GetNeeds() {
    return this.HttpService.GET(ItemController.GetNeeds);
  }
  ChangeItemActivity(model: any) {
    return this.HttpService.POST(ItemController.ChangeItemActivity,model);
  }
}
