import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { CustomersService } from 'src/@nextdriven/Services/customers/customers.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnInit {
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

    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private alertifyService: AlertifyService,
    private CustomersService: CustomersService,
    private CompanyService: CompanyService,
    private dialogRef: MatDialogRef<CreateEditComponent>,
    private cd: ChangeDetectorRef,

  ) {}
  Form: FormGroup;
  Form2: FormGroup;
  Form3: FormGroup;

  ngOnInit(): void {
    console.log(this.defaults);
    
    this.initForm();
    this.GetNeeds()

  }
  initForm() {
    this.Form = this.fb.group({
      FirstName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      LastName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      VATNumber: [null, [Validators.required]],
      Email: [null, [Validators.required]],
      Rewardbalance: [null, [Validators.required]],
    });
    this.Form2 = this.fb.group({
      Country: [1, [Validators.required]],
      City: [1, [Validators.required]],
      District: [1, [Validators.required]],
      Street: [null, [Validators.required]],
      BuildingNumber: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      PostalCode: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    });
    this.Form3 = this.fb.group({
      masterPhone: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      masterMobile: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      contactPerson: [
        null,
        [Validators.required],
        //         [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
    });
    if (this.defaults !== null) {
      this.initFormInEdit();
    }
  }
  initFormInEdit() {
    this.Form.get('FirstName')?.patchValue(this.defaults.firstName);
    this.Form.get('LastName')?.patchValue(this.defaults.lastName);
    this.Form.get('Email')?.patchValue(this.defaults.email);
    this.Form.get('Rewardbalance')?.patchValue(this.defaults.rewardBalance);
    this.Form.get('VATNumber')?.patchValue(this.defaults.vatNumber);
    this.Form.get('Country')?.patchValue(this.defaults.countryID);
    this.Form.get('City')?.patchValue(this.defaults.cityID);
    this.Form.get('District')?.patchValue(this.defaults.districtID);
    this.Form.get('Street')?.patchValue(this.defaults.streetName);
    this.Form.get('BuildingNumber')?.patchValue(this.defaults.buildingNumber);
    this.Form.get('PostalCode')?.patchValue(this.defaults.postalCode);
    this.Form.get('masterPhone')?.patchValue(this.defaults.phoneNumber);
    this.Form.get('masterMobile')?.patchValue(this.defaults.mobileNumber);
  }

  GetNeeds() {

    this.CompanyService.GetNeeds().subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.countries = response.data.countries;
          this.cities = response.data.cities;
          this.districts = response.data.districts;
          
        } else {
          
        }
      },
      (error: Error) => {
        
        this.alertifyService.error('technical error ');
      }
    );
  }
  submit() {
    let body = {
      id: this.defaults !== null ? this.defaults.id : 0,
      firstName: this.Form.get('FirstName')?.value,
      lastName: this.Form.get('LastName')?.value,
      email: this.Form.get('Email')?.value,
      rewardBalance: this.Form.get('Rewardbalance')?.value,
      vatNumber: this.Form.get('VATNumber')?.value,

      countryID: this.Form2.get('Country')?.value,
      cityID: this.Form2.get('City')?.value,
      districtID: this.Form2.get('District')?.value,
      streetName: this.Form2.get('Street')?.value,
      buildingNumber: this.Form2.get('BuildingNumber')?.value,
      postalCode: this.Form2.get('PostalCode')?.value,
      phoneNumber: this.Form3.get('masterPhone')?.value,
      mobileNumber: this.Form3.get('masterMobile')?.value,
    };

    this.CustomersService.Save(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.dialogRef.close('reload');
          this.alertifyService.success(response.message);
          
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
