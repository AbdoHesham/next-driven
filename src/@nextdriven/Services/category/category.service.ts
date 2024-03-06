import { Injectable } from '@angular/core';
import { CategoryController } from 'src/@nextdriven/APIs/CategoryController';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private HttpService: HttpService) {}
  GetCategoriesForDDL() {
    return this.HttpService.GET(CategoryController.GetCategoriesForDDL);
  }
  SaveCategory(model: any) {
    return this.HttpService.POST(CategoryController.SaveCategory, model);
  }
  GetCategoriesList(model: any) {
    return this.HttpService.POST(CategoryController.GetCategoriesList, model);
  }
  GetSubCategoriesList(model: any) {
    return this.HttpService.POST(
      CategoryController.GetSubCategoriesList,
      model
    );
  }
  DeleteCategory(model: any) {
    return this.HttpService.POST(CategoryController.DeleteCategory, model);
  }
  DeleteSubCategory(model: any) {
    return this.HttpService.POST(CategoryController.DeleteSubCategory, model);
  }
  SearchByCategoryName(model: any) {
    return this.HttpService.POST(
      CategoryController.SearchByCategoryName,
      model
    );
  }
  SearchBySubCategoryName(model: any) {
    return this.HttpService.POST(
      CategoryController.SearchBySubCategoryName,
      model
    );
  }
  GetCategoryById(param:any) {
    return this.HttpService.GET(CategoryController.GetCategoryById,param);
  }
  GetSubCategoryById(param:any) {
    return this.HttpService.GET(CategoryController.GetSubCategoryById,param);
  }

}
