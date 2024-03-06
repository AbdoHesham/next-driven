import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';

@Component({
  selector: 'app-create-edit-company',
  templateUrl: './create-edit-company.component.html',
  styleUrls: ['./create-edit-company.component.scss'],
})
export class CreateEditCompanyComponent implements OnInit {
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
    private fb: FormBuilder,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public SharedService: SharedService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}
  Form: FormGroup;
  Form2: FormGroup;
  Form3: FormGroup;
  Form4: FormGroup;
  Form5: FormGroup;
  public show: boolean = false;
  public showmenu: boolean = false;
  @Input() stepper: any;
  isLinear = false;
  maxDate = new Date();
  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    console.log(this.id);

    if (this.id !== null) {
      this.GetCompanyDetails();
    }
    // window.onbeforeunload = (e) => this.confirm(e);
    // window.onbeforeunload = function(event) {
    //   return 'By refreshing this page you may lost all data.';
    // }
    // const onConfirmRefresh = (event: any) => {
    //   event.preventDefault();
    //   return (event.returnValue = 'Are you sure you want to leave the page?');
    // };

    // window.addEventListener('beforeunload', onConfirmRefresh, {
    //   capture: true,
    // });
  }
  // confirm() {
  //   console.log('user want refresh');
  //   this.cd.detectChanges();
  //   this.dialog
  //     .open(CancelEditComponent)
  //     .afterClosed()
  //     .subscribe(() => {});
  // }
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
    });
    this.Form2 = this.fb.group({
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
    this.Form3 = this.fb.group({
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
    this.Form4 = this.fb.group({
      userCompanyRoleID: [0],
      FirstName: [''],
      lastName: [''],
      phoneNumber: [''],
      email: [''],
      userName: [''],
      Password: [''],
      pinCode: [''],
    });
    this.Form5 = this.fb.group({
      numberOfLicenseYears: [
        null,
        [
          // this.startDate == undefined && this.endDate == undefined
          //   ? [Validators.required]
          //   : [],
        ],
      ],
    });
    this.GetNeeds();
    this.GetMnagersListToAssign();
  }
  initFormAfterDetails() {
    this.Form = this.fb.group({
      companyNameEN: [this.CompanyDetails.enName, [Validators.required]],
      CompanyNameAR: [this.CompanyDetails.arName, [Validators.required]],
      VATPercentage: [this.CompanyDetails.vatPercentage, [Validators.required]],
      VATNumber: [this.CompanyDetails.vatNumber, [Validators.required]],
      Receiptnotes: [this.CompanyDetails.receiptNotes, [Validators.required]],
      vatType: [this.CompanyDetails.vatType, [Validators.required]],
      companyType: [this.CompanyDetails.type, [Validators.required]],

      // fileInput: [this.CompanyDetails.logo, [Validators.required]],

      IsPriceIncludeVAT: [this.CompanyDetails.isPriceIncludeVAT],
    });

    this.Form2 = this.fb.group({
      Country: [this.CompanyDetails.countryID, [Validators.required]],
      City: [this.CompanyDetails.cityID, [Validators.required]],
      District: [this.CompanyDetails.districtID, [Validators.required]],
      Street: [this.CompanyDetails.streetName],
      BuildingNumber: [this.CompanyDetails.buildingNumber],
      PostalCode: [this.CompanyDetails.postalCode],
    });

    this.Form3 = this.fb.group({
      masterPhone: [
        this.CompanyDetails.masterBranchPhone,
        [Validators.required],
      ],
      masterMobile: [
        this.CompanyDetails.masterBranchMobile,
        [Validators.required],
      ],
      contactPerson: [this.CompanyDetails.contactPerson, [Validators.required]],
    });

    this.Form4 = this.fb.group({
      userCompanyRoleID: [this.CompanyDetails.userCompanyRoleID || 0],
      FirstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      Password: ['', Validators.required],
      pinCode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(Patterns.numbersOnly),
        ],
      ],
    });

    this.Form5 = this.fb.group({
      numberOfLicenseYears: [
        this.CompanyDetails.numberOfLicenseYears,
        [
          // this.startDate == undefined && this.endDate == undefined
          //   ? [Validators.required]
          //   : [],
        ],
      ],
    });

    setTimeout(() => {
      this.startDate = new Date(this.CompanyDetails.licenseStartDate);
      this.endDate = new Date(this.CompanyDetails.licenseEndDate);
      console.log(this.endDate);
    }, 1000);
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

  cancel() {
    this.showmenu = !this.showmenu;
    this.show = !this.show;
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
        this.alertifyService.error('technical error ');
      }
    );
  }
  GetMnagersListToAssign() {
    let body = {
      // pageIndex: 1,
      // pageSize: 10,
      organizationID: JSON.parse(
        localStorage.getItem('organizationID') || '{}'
      ),
    };

    this.CompanyService.GetMnagersListToAssign(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.managers = response.data;
          // this.alertifyService.success(response.message);
        } else {
          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        // this.alertifyService.error('technical error ');
      }
    );
  }
  async GetCompanyDetails() {
    let body = {
      companyID: +this.id,
    };
    await this.CompanyService.GetCompanyDetails(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          // this.alertifyService.success(response.message);
          this.CompanyDetails = response.data;
          this.imgName = this.CompanyDetails.logo.split(' ')[1];

          this.initFormAfterDetails();
        } else {
          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        // this.alertifyService.error('technical error ');
      }
    );
  }
  CreateManager() {
    let body = {
      firstName: this.Form4.get('FirstName')?.value?.trim() || '',
      lastName: this.Form4.get('lastName')?.value?.trim() || '',
      username: this.Form4.get('userName')?.value?.trim() || '',
      password: this.Form4.get('Password')?.value?.trim() || '',
      email: this.Form4.get('email')?.value?.trim() || '',
      phoneNumber: this.Form4.get('phoneNumber')?.value?.trim() || '',
      pinCode: this.Form4.get('pinCode')?.value.trim(),

      organizationID: JSON.parse(
        localStorage.getItem('organizationID') || '{}'
      ),
    };
    this.CompanyService.CreateManager(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.GetMnagersListToAssign();
          this.show = !this.show;
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  submit() {
    const formData: FormData = new FormData();
    if (this.id !== null) {
      formData.append('ID', this.id);
    }
    formData.append(
      'UserCompanyRoleID',
      this.Form4.controls['userCompanyRoleID'].value.toString()
    );
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
      this.Form2.controls['Country'].value.toString()
    );
    formData.append('CityID', this.Form2.controls['City'].value.toString());
    formData.append(
      'DistrictID',
      this.Form2.controls['District'].value.toString()
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
      this.Form2.controls['BuildingNumber'].value.toString()
    );
    formData.append(
      'StreetName',
      this.Form2.controls['Street'].value.toString()
    );
    // formData.append('SecondaryNumber', this.Form2.controls['BuildingNumber'].value.toString());
    formData.append(
      'PostalCode',
      this.Form2.controls['PostalCode'].value.toString()
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
        // : this.Form5.controls['dateRange'].value == 1
        // ? new Date(after1Year).toDateString()
        // : this.Form5.controls['dateRange'].value == 2
        // ? new Date(after2Year).toDateString()
        // : this.Form5.controls['dateRange'].value == 3
        // ? new Date(after3Year).toDateString()
        // : new Date().toDateString()
      );
    }
    if (this.endDate == undefined && this.startDate == undefined) {
      formData.append(
        'NumberOfLicenseYears',
        this.Form5.controls['numberOfLicenseYears'].value.toString()
      );
    }
    formData.append(
      'MasterBranchPhone',
      this.Form3.controls['masterPhone'].value.toString()
    );
    formData.append(
      'MasterBranchMobile',
      this.Form3.controls['masterMobile'].value.toString()
    );
    formData.append(
      'ContactPerson',
      this.Form3.controls['contactPerson'].value.toString()
    );

    this.CompanyService.SaveCompany(formData).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.managers = response.data;
          this.alertifyService.success(response.message);

          this.router.navigateByUrl('/master-admin/companies/list');
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  numberOfLicenseYearsSelect(e: any) {
    this.startDate = undefined;
    this.endDate = undefined;
  }
  onSelectDate(e: any) {
    this.Form5.controls['numberOfLicenseYears'].patchValue(null);
  }
  changeCurrentLang(lang: string) {
    this.SharedService.changeCurrentLang(lang);
  }

  // detectAddress() {
  //   this.dialog
  //     .open(GoogleMapsComponent, {
  //     })
  //     .afterClosed()
  //     .subscribe(() => {});
  // }
}
