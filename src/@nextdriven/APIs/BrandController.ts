
import { BaseURL } from '../config';
export const BrandController = {
    SaveBrand: BaseURL + `/api/Item/Brand/Save`,
    GetBrandList: BaseURL + `/api/Item/Brand/GetAll`,
    DeleteBrand: BaseURL + `/api/Item/Brand/Delete`,
    SearchByBrandName: BaseURL + `/api/Item/Brand/SearchByName`,
   
}