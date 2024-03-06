
import { Injectable } from '@angular/core';
import { ItemController } from 'src/@nextdriven/APIs/ItemController';
import { UOMController } from 'src/@nextdriven/APIs/UOMController';
import { HttpService } from '../http.service';
import { OpenRegisterController } from 'src/@nextdriven/APIs/OpenRegisterController';

@Injectable({
  providedIn: 'root',
})
export class OpenRegisterService {
  constructor(private HttpService: HttpService) {}

  CloseRegister(model: any) {
    return this.HttpService.POST(OpenRegisterController.CloseRegister, model);
  }

  LastOpenCloseRegister() {
    return this.HttpService.GET(OpenRegisterController.LastOpenCloseRegister);
  }
  OpenNewRegister(openingAmount:any) {
    return this.HttpService.GET(OpenRegisterController.OpenNewRegister,openingAmount);
  }
}
