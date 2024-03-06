import { BaseURL } from '../config';

export const CategoryController = {
  SaveCategory: BaseURL + `/api/Company/Category/SaveCategory`,
  GetCategoriesForDDL: BaseURL + `/api/Company/Category/GetCategoriesForDDL`,
  GetCategoriesList: BaseURL + `/api/Company/Category/GetCategoriesList`,
  GetSubCategoriesList: BaseURL + `/api/Company/Category/GetSubCategoriesList`,
  DeleteCategory: BaseURL + `/api/Company/Category/DeleteCategory`,
  DeleteSubCategory: BaseURL + `/api/Company/Category/DeleteSubCategory`,
  SearchByCategoryName: BaseURL + `/api/Company/Category/SearchByCategoryName`,
  SearchBySubCategoryName:
    BaseURL + `/api/Company/Category/SearchBySubCategoryName`,
  GetCategoryById: BaseURL + `/api/Company/Category/GetCategoryById`,
  GetSubCategoryById: BaseURL + `/api/Company/Category/GetSubCategoryById`,
};
