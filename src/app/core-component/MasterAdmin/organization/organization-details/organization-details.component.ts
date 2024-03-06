import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationDetails } from 'src/@nextdriven/Models/Layout/organizationDetails';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { OrganizationService } from 'src/@nextdriven/Services/organization/organization.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
})
export class OrganizationDetailsComponent implements OnInit {
  invoiceNumber: any;
  name: any;
  vatNumber: any;
  fullName: any;
  phoneNumber: any;
  firstName: any;
  lastName: any;
  // isOrganizationFound: boolean = false;
  constructor(
    private OrganizationService: OrganizationService,
    private alertifyService: AlertifyService,
    private router: Router,
    public SharedService: SharedService,
  ) {}
  
  organizationID =JSON.parse(localStorage.getItem('organizationID')|| '{}');
  ngOnInit(): void {
    console.log(this.organizationID);
    
    localStorage.setItem('isFirstLogin', JSON.stringify(false));

    if (this.organizationID == null ) {
      this.create();
    }
    this.GatOrganizationDetails();
  }
  GatOrganizationDetails() {
    const body: OrganizationDetails = {
      organizationID: this.organizationID,
    };
    this.OrganizationService.GatOrganizationDetails(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          // this.alertifyService.success(response.message);
          this.invoiceNumber = response.data.invoiceNumber;
          this.name = response.data.name;
          this.vatNumber = response.data.vatNumber;
          this.fullName = response.data.ownerInfo.fullName;
          this.firstName = response.data.ownerInfo.userName;
          this.lastName = this.fullName.split(' ')[1];
          this.phoneNumber = response.data.ownerInfo.phoneNumber;


          
        } else {
          

          this.alertifyService.error(response.message);
          this.alertifyService.error('Create Your Organization First');
          this.router.navigateByUrl('/master-admin/organization/create');
        }
      },
      (error: Error) => {
        
        // this.alertifyService.error('technical error ');
      }
    );
  }

  gotoCreate() {
    if (this.organizationID == 0) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    this.router.navigateByUrl('/master-admin/organization/create');
  }
  edit() {
    this.router.navigate(['/master-admin/organization/create',{id:this.organizationID}]);
  }
  changeCurrentLang(lang: string) {
    this.SharedService.changeCurrentLang(lang);
  }
}
