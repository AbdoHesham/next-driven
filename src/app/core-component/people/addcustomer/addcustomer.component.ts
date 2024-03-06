import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamsDto } from 'src/@nextdriven/Models/Common/response';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { CustomersService } from 'src/@nextdriven/Services/customers/customers.service';
import { routes } from 'src/app/core/helpers/routes';
@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.scss']
})
export class AddcustomerComponent implements OnInit {
  id: any;
  countries: any;
  cities: any;
  districts: any;
  defaults: any;

  constructor(public fb: FormBuilder,
    private alertifyService: AlertifyService,
    private CustomersService: CustomersService,
    private CompanyService: CompanyService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }
  Form: FormGroup;
  public routes = routes;

  ngOnInit(): void {
    
    
    this.initForm();
    this.GetNeeds()
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    console.log( typeof this.id);
    if (this.id !== '0' ) this.GetById();

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
      Country: [1, [Validators.required]],
      City: [1, [Validators.required]],
      District: [1, [Validators.required]],
      Street: [null, [Validators.required]],
      BuildingNumber: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      PostalCode: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      masterPhone: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      masterMobile: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      // contactPerson: [
      //   null,
      //   [Validators.required],
      //   //         [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      // ],
    });
   
    
    
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
  GetById() {
    let params: QueryParamsDto[] = [
      {
        key: 'id',
        value: this.id,
      },
    ];
    this.CustomersService.GetById(params).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.defaults = response.data;
          this.initFormInEdit();
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
    console.log(this.Form );
    
    let body = {
      id: this.id !== '0' ? this.defaults.id : 0,
      firstName: this.Form.get('FirstName')?.value,
      lastName: this.Form.get('LastName')?.value,
      email: this.Form.get('Email')?.value,
      rewardBalance: this.Form.get('Rewardbalance')?.value,
      vatNumber: this.Form.get('VATNumber')?.value,

      countryID: this.Form.get('Country')?.value,
      cityID: this.Form.get('City')?.value,
      districtID: this.Form.get('District')?.value,
      streetName: this.Form.get('Street')?.value,
      buildingNumber: this.Form.get('BuildingNumber')?.value,
      postalCode: this.Form.get('PostalCode')?.value,
      phoneNumber: this.Form.get('masterPhone')?.value,
      mobileNumber: this.Form.get('masterMobile')?.value,
    };

    this.CustomersService.Save(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/people/customer-list');

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
