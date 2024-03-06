import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { routes } from 'src/app/core/core.index';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  public routes = routes;
  imgAsBinary: any;
  imagePath: any;
  newsImgB64: any;
  imgName: any;
  imgURL: any;
  vatTypes: any;
  companyTypes: any;
  managers: any;
  countries: any;
  cities: any;
  districts: any;
  startDate: any;
  endDate: any;
  id: any;
  CompanyDetails: any;
  constructor(
    public SharedService: SharedService,
    public fb: FormBuilder,
    private router: Router,
    private CompanyService: CompanyService,
  ) {}
  Form: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.GetCompanyDetails();
    this.GetNeeds();
  }
  initForm() {
    this.Form = this.fb.group({
      companyNameEN: [''],
      CompanyNameAR: [''],
      VATPercentage: [''],
      VATNumber: [''],
      Receiptnotes: [''],
      vatType: [1],
      companyType: [1],

      // fileInput: [''],

      IsPriceIncludeVAT: [false],
      Country: [1],
      City: [1],
      District: [1],
      Street: [''],
      BuildingNumber: [''],
      PostalCode: [''],

      masterPhone: [''],
      masterMobile: [''],
      contactPerson: [''],
    });
  }
  GetCompanyDetails() {
    let body = {
      companyID: JSON.parse(localStorage.getItem('companyID') || ''),
    };
    this.CompanyService.GetCompanyDetails(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.CompanyDetails = response.data;
          this.initFormAfterDetails();

              } else {
              }
      },
      (error: Error) => {
          }
    );
  }

  initFormAfterDetails() {

    this.Form.get('companyNameEN')?.patchValue(this.CompanyDetails.enName);
    this.Form.get('CompanyNameAR')?.patchValue(this.CompanyDetails.arName);
    this.Form.get('VATPercentage')?.patchValue(
      this.CompanyDetails.vatPercentage
    );
    this.Form.get('VATNumber')?.patchValue(this.CompanyDetails.vatNumber);
    this.Form.get('Receiptnotes')?.patchValue(this.CompanyDetails.receiptNotes);
    this.Form.get('vatType')?.patchValue(this.CompanyDetails.vatType);
    this.Form.get('companyType')?.patchValue(this.CompanyDetails.type);
    this.Form.get('IsPriceIncludeVAT')?.patchValue(
      this.CompanyDetails.isPriceIncludeVAT
    );
    this.Form.get('Country')?.patchValue(this.CompanyDetails.countryID);
    this.Form.get('City')?.patchValue(this.CompanyDetails.cityID);
    this.Form.get('District')?.patchValue(this.CompanyDetails.districtID);
    this.Form.get('Street')?.patchValue(this.CompanyDetails.streetName);
    this.Form.get('BuildingNumber')?.patchValue(
      this.CompanyDetails.buildingNumber
    );
    this.Form.get('PostalCode')?.patchValue(this.CompanyDetails.postalCode);
    this.Form.get('masterPhone')?.patchValue(
      this.CompanyDetails.masterBranchPhone
    );
    this.Form.get('masterMobile')?.patchValue(
      this.CompanyDetails.masterBranchMobile
    );
    this.Form.get('contactPerson')?.patchValue(
      this.CompanyDetails.contactPerson
    );

  }

  GetNeeds() {

    this.CompanyService.GetNeeds().subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.vatTypes = response.data.vatTypes;
          this.companyTypes = response.data.companyTypes;
          this.countries = response.data.countries;
          this.cities = response.data.cities;
          this.districts = response.data.districts;

              } else {
      
          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
          }
    );
  }
}


