import { BaseURL } from "../config";


export const StoreController = {
   
    SaveWarehouse: BaseURL + `/api/Peoples/Warehouse/Save`,
    GettAllWarehouse: BaseURL + `/api/Peoples/Warehouse/GetAll`,
    DeleteWarehouse: BaseURL + `/api/Peoples/Warehouse/Delete`,
    UpdateStatusWarehouse: BaseURL + `/api/Peoples/Warehouse/UpdateStatus`,
    SearchByWarehouseName: BaseURL + `/api/Peoples/Warehouse/SearchByName`,

    

    
}