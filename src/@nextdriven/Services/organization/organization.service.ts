import { Injectable } from '@angular/core';
import { OrganizationController } from 'src/@nextdriven/APIs/OrganizationController';
import { CreateEditOrganization } from 'src/@nextdriven/Models/Layout/CreateEditOrganization';
import { OrganizationDetails } from 'src/@nextdriven/Models/Layout/organizationDetails';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private HttpService: HttpService) {}
  SaveOrganization(model: CreateEditOrganization) {
    return this.HttpService.POST(
      OrganizationController.SaveOrganization,
      model
    );
  }
  GatOrganizationDetails(model: OrganizationDetails) {
    return this.HttpService.POST(
      OrganizationController.GatOrganizationDetails,
      model
    );
  }
}
