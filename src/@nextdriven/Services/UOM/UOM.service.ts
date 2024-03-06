import { Injectable } from '@angular/core';
import { UOMController } from 'src/@nextdriven/APIs/UOMController';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class UOMService {
  constructor(private HttpService: HttpService) {}

  SaveMeasurementUnitsList(model: any) {
    return this.HttpService.POST(UOMController.SaveMeasurementUnitsList, model);
  }
  GetMeasurementUnitsList(model: any) {
    return this.HttpService.POST(UOMController.GetMeasurementUnitsList, model);
  }
  SearchByMeasurementUnitName(model: any) {
    return this.HttpService.POST(
      UOMController.SearchByMeasurementUnitName,
      model
    );
  }
  DeleteMeasurementUnit(model: any) {
    return this.HttpService.POST(UOMController.DeleteMeasurementUnit, model);
  }
  GetMeasurementUnitsForDDL() {
    return this.HttpService.GET(UOMController.GetMeasurementUnitsForDDL);
  }
  GetMeasurementUnitById(param:any) {
    return this.HttpService.GET(UOMController.GetMeasurementUnitById,param);
  }
  
  
}
