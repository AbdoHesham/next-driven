// import { ViewEncapsulation } from '@angular/compiler';
import { Component, EventEmitter, OnInit, ViewEncapsulation,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { UsersService } from 'src/@nextdriven/Services/users/users.service';


@Component({
  selector: 'app-create-sepling-company',
  templateUrl: './create-sepling-company.component.html',
  styleUrls: ['./create-sepling-company.component.scss'],
 
})
export class CreateSeplingCompanyComponent implements OnInit   {
  
  districts: any;
  cities: any;
  countries: any;
  vatTypes: any;
  companyTypes: any;
  imgName: any;
  imgURL: string | ArrayBuffer | null;
  newsImgB64: any;
  imagePath: any;
  imgAsBinary: any;
  startDate: any;
  endDate: any;
  constructor(
    private fb: FormBuilder,
    public SharedService: SharedService,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService,
    private UsersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  
  Form21: FormGroup;
  Form22: FormGroup;
  Form23: FormGroup;
  Form24: FormGroup;
  Form25: FormGroup;
  show: boolean = false;
  maxDate = new Date();
  linearMode = true;

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }

  stepOneState='check';
  stepTwoState='check';
  stepThreeState='check';
  stepFourState='check'
 
  changeStatusOfStepTwo()
  {
    this.stepOneState="edit";
  }
  changeStepOneStatus()
  {
    this.stepOneState="done";
    this.stepTwoState="check";
  }
  changeStatsOfStepTwo()
  {
    this.stepTwoState='done';
   // this.stepThreeState='edit';
    this.stepThreeState='check';
    this.stepFourState='check';
  }
  changeStepThreeStatus()
  {
    this.stepThreeState='check';
    this.stepTwoState='done'
    //this.stepFourState='check';
  }
  changeStatusOfStepFour()
  {
    this.stepFourState='check';
    this.stepThreeState='done'
  }
  organizationID = JSON.parse(localStorage.getItem('organizationID') || '{}');
  @Output() companyCreated: EventEmitter<any> =new EventEmitter<any>();
  ngOnInit(): void {
    this.initForm();
    this.GetNeeds();
  }

  initForm() {
    this.Form21 = this.fb.group({
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
    });
    this.Form22 = this.fb.group({
      Country: [1, [Validators.required]],
      City: [1, [Validators.required]],
      District: [1, [Validators.required]],
      Street: ['', [Validators.required]],
      BuildingNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      PostalCode: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    });
    this.Form23 = this.fb.group({
      masterPhone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      masterMobile: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      contactPerson: ['', [Validators.required]],
    });
    this.Form24 = this.fb.group({
      numberOfLicenseYears: [
        null,
        [
          // this.startDate == undefined && this.endDate == undefined
          //   ? [Validators.required]
          //   : [],
        ],
      ],
    });
  }
  changeCurrentLang(lang: string) {
    this.SharedService.changeCurrentLang(lang);
  }
  toggle() {
    this.show = !this.show;
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
  numberOfLicenseYearsSelect(e: any) {
    this.startDate = undefined;
    this.endDate = undefined;
  }
  onSelectDate(e: any) {
    this.Form24.controls['numberOfLicenseYears'].patchValue(null);
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
          // this.roles = response.data.roles;
          // this.altRoles = this.roles;
          // this.altRoles = this.altRoles.filter((r: any) => {
          //   return r.id !== 2;
          // });

        } else {

          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  submit() {
    const formData: FormData = new FormData();
    // if (this.id !== null) {
    //   formData.append('ID', this.id);
    // }
    // formData.append(
    //   'UserCompanyRoleID',
    //   this.Form24.controls['userCompanyRoleID'].value.toString()
    // );
    formData.append(
      'ARName',
      this.Form21.controls['CompanyNameAR'].value.toString()
    );
    formData.append(
      'ENName',
      this.Form21.controls['companyNameEN'].value.toString()
    );
    formData.append(
      'OrganizationID',
      JSON.parse(localStorage.getItem('organizationID') || '{}')
    );
    formData.append(
      'CountryID',
      this.Form22.controls['Country'].value.toString()
    );
    formData.append('CityID', this.Form22.controls['City'].value.toString());
    formData.append(
      'DistrictID',
      this.Form22.controls['District'].value.toString()
    );
    if (this.newsImgB64 !== undefined) {
      formData.append('LogoFile', this.newsImgB64, this.newsImgB64.name);
    }

    formData.append('Type', this.Form21.controls['companyType'].value.toString());
    formData.append(
      'VATPercentage',
      this.Form21.controls['VATPercentage'].value.toString()
    );
    formData.append(
      'VATNumber',
      this.Form21.controls['VATNumber'].value.toString()
    );
    formData.append('VATType', this.Form21.controls['vatType'].value.toString());
    formData.append(
      'IsPriceIncludeVAT',
      this.Form21.controls['IsPriceIncludeVAT'].value
    );
    formData.append(
      'ReceiptNotes',
      this.Form21.controls['Receiptnotes'].value.toString()
    );
    // formData.append('ShortAddress', this.Form21.controls['priceType'].value.toString());
    formData.append(
      'BuildingNumber',
      this.Form22.controls['BuildingNumber'].value.toString()
    );
    formData.append(
      'StreetName',
      this.Form22.controls['Street'].value.toString()
    );
    // formData.append('SecondaryNumber', this.Form22.controls['BuildingNumber'].value.toString());
    formData.append(
      'PostalCode',
      this.Form22.controls['PostalCode'].value.toString()
    );
    if (this.startDate !== undefined) {
      formData.append(
        'LicenseStartDate',

        new Date(this.startDate).toDateString()

        // new Date(this.startDate).toDateString() !== undefined ||
        //   new Date(this.startDate).toDateString() !== null
        //   ? new Date(this.startDate).toDateString()
        //   : new Date().toDateString()
      );
    }
    if (this.endDate !== undefined) {
      formData.append(
        'LicenseEndDate',
        new Date(this.endDate).toDateString()

        // new Date(this.endDate).toDateString() !== undefined ||
        // new Date(this.endDate).toDateString() !== null
        // ? new Date(this.endDate).toDateString()
        // : this.Form24.controls['dateRange'].value == 1
        // ? new Date(after1Year).toDateString()
        // : this.Form24.controls['dateRange'].value == 2
        // ? new Date(after2Year).toDateString()
        // : this.Form24.controls['dateRange'].value == 3
        // ? new Date(after3Year).toDateString()
        // : new Date().toDateString()
      );
    }
    if (this.endDate == undefined && this.startDate == undefined) {
      formData.append(
        'NumberOfLicenseYears',
        this.Form24.controls['numberOfLicenseYears'].value.toString()
      );
    }
    formData.append(
      'MasterBranchPhone',
      this.Form23.controls['masterPhone'].value.toString()
    );
    formData.append(
      'MasterBranchMobile',
      this.Form23.controls['masterMobile'].value.toString()
    );
    formData.append(
      'ContactPerson',
      this.Form23.controls['contactPerson'].value.toString()
    );


    this.CompanyService.SaveCompany(formData).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          // this.managers = response.data;
          this.alertifyService.success(response.message);
          let companyCreated = true 
          this.companyCreated.emit(companyCreated)
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
