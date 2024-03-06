
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { routes } from 'src/app/core/core.index';
@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent {
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
  id: any = JSON.parse(localStorage.getItem('companyID') || '');
  CompanyDetails: any;
  //dialog: any;
  constructor(
    public SharedService: SharedService,
    public fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService
  ) {}
  Form: FormGroup;
  Form3: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.GetCompanyDetails();
    this.GetNeeds();
  }
  initForm() {
    this.Form = this.fb.group({
      companyNameEN: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      CompanyNameAR: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      VATPercentage: ['', [Validators.required]],
      VATNumber: ['', [Validators.required]],
      Receiptnotes: ['', [Validators.required]],
      vatType: [1, [Validators.required]],
      companyType: [1, [Validators.required]],

      // fileInput: ['', [Validators.required]],

      IsPriceIncludeVAT: [false],
      Country: [1, [Validators.required]],
      City: [1, [Validators.required]],
      District: [1, [Validators.required]],
      Street: ['', [Validators.required]],
      BuildingNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      PostalCode: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],

      masterPhone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      masterMobile: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      contactPerson: [
        '',
        [Validators.required],
        //         [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
    });
  }
  changeCurrentLang(lang: string) {
    this.SharedService.changeCurrentLang(lang);
  }
  preview(files: any) {
    // console.log(files)
    if (files.length === 0) return;
    this.imgAsBinary = files[0];
    let mimeType = files[0].type;
    let reader = new FileReader();
    this.imagePath = files;
    this.newsImgB64 = files[0];

    this.imgName = files[0].name;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      // console.log(this.imgURL, 'imgURL');
      let imgBase6 = (reader.result as string).substr(
        (reader.result as string).indexOf(',') + 1
      );
      // this.newsImgB64 = imgBase6;
    };
  }
  goToTabs() {
    this.router.navigateByUrl(this.routes.addTransfer);
  }
  // detectAddress() {
  //   this.dialog
  //     .open(GoogleMapsComponent, {})
  //     .afterClosed()
  //     .subscribe(() => {});
  // }

  GetCompanyDetails() {
    let body = {
      companyID: this.id,
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
  submit() {
    const formData: FormData = new FormData();
    if (this.id !== null) {
      formData.append('ID', this.id);
    }
    // formData.append(
    //   'UserCompanyRoleID',
    //   this.Form4.controls['userCompanyRoleID'].value.toString()
    // );
    formData.append(
      'ARName',
      this.Form.controls['CompanyNameAR'].value.toString()
    );
    formData.append(
      'ENName',
      this.Form.controls['companyNameEN'].value.toString()
    );
    formData.append(
      'OrganizationID',
      JSON.parse(localStorage.getItem('organizationID') || '{}')
    );
    formData.append(
      'CountryID',
      this.Form.controls['Country'].value.toString()
    );
    formData.append('CityID', this.Form.controls['City'].value.toString());
    formData.append(
      'DistrictID',
      this.Form.controls['District'].value.toString()
    );
    if (this.newsImgB64 !== undefined) {
      formData.append('LogoFile', this.newsImgB64, this.newsImgB64.name);
    }

    formData.append('Type', this.Form.controls['companyType'].value.toString());
    formData.append(
      'VATPercentage',
      this.Form.controls['VATPercentage'].value.toString()
    );
    formData.append(
      'VATNumber',
      this.Form.controls['VATNumber'].value.toString()
    );
    formData.append('VATType', this.Form.controls['vatType'].value.toString());
    formData.append(
      'IsPriceIncludeVAT',
      this.Form.controls['IsPriceIncludeVAT'].value
    );
    formData.append(
      'ReceiptNotes',
      this.Form.controls['Receiptnotes'].value.toString()
    );
    // formData.append('ShortAddress', this.Form.controls['priceType'].value.toString());
    formData.append(
      'BuildingNumber',
      this.Form.controls['BuildingNumber'].value.toString()
    );
    formData.append(
      'StreetName',
      this.Form.controls['Street'].value.toString()
    );
    // formData.append('SecondaryNumber', this.Form.controls['BuildingNumber'].value.toString());
    formData.append(
      'PostalCode',
      this.Form.controls['PostalCode'].value.toString()
    );

    formData.append(
      'MasterBranchPhone',
      this.Form.controls['masterPhone'].value.toString()
    );
    formData.append(
      'MasterBranchMobile',
      this.Form.controls['masterMobile'].value.toString()
    );
    formData.append(
      'ContactPerson',
      this.Form.controls['contactPerson'].value.toString()
    );
    if (
      this.CompanyDetails.licenseStartDate &&
      this.CompanyDetails.licenseEndDate !== null &&
      this.CompanyDetails.licenseStartDate &&
      this.CompanyDetails.licenseEndDate !== undefined
    ) {
      formData.append('LicenseStartDate', this.CompanyDetails.licenseStartDate);
      formData.append('LicenseEndDate', this.CompanyDetails.licenseEndDate);
    }
    if (
      this.CompanyDetails.numberOfLicenseYears !== 0 
    ) {
      formData.append(
        'NumberOfLicenseYears',
        this.CompanyDetails.numberOfLicenseYears
      );
    }

    this.CompanyService.SaveCompany(formData).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.managers = response.data;
          this.alertifyService.success(response.message);
          this.goToTabs();
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
}


