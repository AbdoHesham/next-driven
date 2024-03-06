import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { BrandController } from 'src/@nextdriven/APIs/BrandController';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private HttpService: HttpService) { }
  SaveBrandList(model: any) {
    return this.HttpService.POST(BrandController.SaveBrand,model);
  }
  GetBrandList(model: any) {
    return this.HttpService.POST(BrandController.GetBrandList, model);
  }
  SearchByBrandName(model: any) {
    return this.HttpService.POST(
     BrandController.SearchByBrandName,
      model
    );
  }
  DeleteBrand(model: any) {
    return this.HttpService.POST(BrandController.DeleteBrand, model);
  }
}
