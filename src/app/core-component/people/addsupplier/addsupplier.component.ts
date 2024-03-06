import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { QueryParamsDto } from 'src/@nextdriven/Models/Common/response';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { VendorsService } from 'src/@nextdriven/Services/vendors/vendors.service';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-addsupplier',
  templateUrl: './addsupplier.component.html',
  styleUrls: ['./addsupplier.component.scss']
})
export class AddsupplierComponent implements OnInit {
  id: any | null;
  countries: any;
  cities: any;
  districts: any;
  defaults: any;

  constructor(public fb: FormBuilder,
    private alertifyService: AlertifyService,
    private CompanyService: CompanyService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private VendorsService: VendorsService,

    ) { }
  Form: FormGroup;
  public routes = routes;

  ngOnInit(): void {
    
    
    this.initForm();
    this.GetNeeds()
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id !== '0' ) this.GetById();
  }
  initForm() {
    this.Form = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      vatPercentage: [null, [Validators.required]],
      vatNumber: [null, [Validators.required ,Validators.minLength(15) , Validators.maxLength(15)]],
      // Receiptnotes: ['', [Validators.required]],
      // vatType: [1, [Validators.required]],
      // companyType: [1, [Validators.required]],

      // fileInput: ['', [Validators.required]],

      // IsPriceIncludeVAT: [false],
      countryID: [1, [Validators.required]],
      cityID: [1, [Validators.required]],
      districtID: [1, [Validators.required]],
      streetName: [null, [Validators.required]],
      buildingNumber: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      postalCode: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      contactPersonName: [
        null,
        [
          Validators.required,
          Validators.pattern(Patterns.EnAndArName),
        ],
      ],
      contactPersonNumber: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
      vendorNumber: [
        null,
        [Validators.required],
        //         [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
      ],
    });
   

  }
  initFormInEdit() {
    this.Form.get('name')?.patchValue(this.defaults.name);
    this.Form.get('vatNumber')?.patchValue(this.defaults.vatNumber);
    this.Form.get('vatPercentage')?.patchValue(this.defaults.vatPercentage);
    this.Form.get('countryID')?.patchValue(this.defaults.countryID);
    this.Form.get('cityID')?.patchValue(this.defaults.cityID);
    this.Form.get('districtID')?.patchValue(this.defaults.districtID);
    this.Form.get('streetName')?.patchValue(this.defaults.streetName);
    this.Form.get('buildingNumber')?.patchValue(this.defaults.buildingNumber);
    this.Form.get('postalCode')?.patchValue(this.defaults.postalCode);
    this.Form.get('contactPersonName')?.patchValue(
      this.defaults.contactPersonName
    );
    this.Form.get('contactPersonNumber')?.patchValue(
      this.defaults.contactPersonNumber
    );
    this.Form.get('vendorNumber')?.patchValue(this.defaults.vendorNumber);
  }
  GetById() {
    let params: QueryParamsDto[] = [
      {
        key: 'id',
        value: this.id,
      },
    ];
    this.VendorsService.GetById(params).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.defaults = response.data;
          this.initFormInEdit();
        }

        else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
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
    console.log(this.Form);
    
    let body = {
      id: this.id !== '0' ? this.defaults.id : 0,
      name: this.Form.get('name')?.value,
      countryID: this.Form.get('countryID')?.value,
      cityID: this.Form.get('cityID')?.value,
      districtID: this.Form.get('districtID')?.value,
      streetName: this.Form.get('streetName')?.value,
      buildingNumber: this.Form.get('buildingNumber')?.value,
      postalCode: this.Form.get('postalCode')?.value,
      vatNumber: this.Form.get('vatNumber')?.value.toString(),
      vatPercentage: this.Form.get('vatPercentage')?.value,
      contactPersonName: this.Form.get('contactPersonName')?.value,
      contactPersonNumber: this.Form.get('contactPersonNumber')?.value,
      vendorNumber: this.Form.get('vendorNumber')?.value,
    };
    this.VendorsService.Save(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/people/supplier-list');
        } 
        else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        
        this.alertifyService.error('technical error ');
      }
    );
  }
}
