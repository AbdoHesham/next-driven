import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { UsersService } from 'src/@nextdriven/Services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import {STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
@Component({
  selector: 'app-create-edit-users',
  templateUrl: './create-edit-users.component.html',
  styleUrls: ['./create-edit-users.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  // encapsulation: ViewEncapsulation.None

   
})
export class CreateEditUsersComponent implements OnInit {
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
  roles: any;
  CompaniesForDDL: any;
  altCompaniesForDDL: any;
  altRoles: any;
  constructor(
    private fb: FormBuilder,
    public SharedService: SharedService,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService,
    private UsersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {}
  Form: FormGroup;
  Form2: FormGroup;
  show: boolean = false;
  maxDate = new Date();
  isLinear = false;
  organizationID = JSON.parse(localStorage.getItem('organizationID') || '{}');
  showPass: boolean = false;
  initForm() {
    this.Form = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      Email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      assignrole: [3,[Validators.required]],
      defaultPrinter: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      kitchenPrinter: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      userName: ['', Validators.required],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(Patterns.complexPassword),
        ],
      ],
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

    this.Form2 = this.fb.group({
      companyID: [0],
    });

  }
  isEditable = false;
  
  ngOnInit(): void {
    this.initForm();
    this.GetNeeds();
    this.GetCompaniesForDDL();
    // this.activatedRoute.paramMap.subscribe((params) => {
    //   this.id = params.get('id');
    // });
    // console.log(this.id);
    
  }

  changeCurrentLang(lang: string) {
    this.SharedService.changeCurrentLang(lang);
  }
  toggle() {
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
          this.roles = response.data.roles;
          this.altRoles = this.roles;
          this.altRoles = this.altRoles.filter((r: any) => {
            return r.id !== 2;
          });          
        } else {
          

          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        
        this.alertifyService.error('technical error ');
      }
    );
  }


  CreateUserWithAssignCompany() {
    let body = {
      firstName: this.Form.get('firstName')?.value,
      lastName: this.Form.get('lastName')?.value,
      username: this.Form.get('userName')?.value,
      password: this.Form.get('Password')?.value,
      phoneNumber: this.Form.get('phoneNumber')?.value,
      email: this.Form.get('Email')?.value,
      organizationID: this.organizationID,
      userRole : this.Form.get('assignrole')?.value,
      companyID:  this.Form2.get('companyID')?.value,
      defaultPrinter: this.Form.get('defaultPrinter')?.value,
      kitchenPrinter: this.Form.get('kitchenPrinter')?.value,
      "pinCode": this.Form.get('pinCode')?.value.trim(),
      "customRoleID": 0,

    };

    this.UsersService.CreateUserWithAssignCompany(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/master-admin/users/list');
          
        } else {
          

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        
        this.alertifyService.error('technical error ');
      }
    );
  }
  GetCompaniesForDDL() {
    let body = {
      pageIndex: 1,
      pageSize: 10,
      organizationID: JSON.parse(localStorage.getItem('organizationID') || '{}'),
    };

    this.CompanyService.GetCompaniesForDDL(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.CompaniesForDDL = response.data;
          this.altCompaniesForDDL = this.CompaniesForDDL;
          
        } else {
          

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        
      }
    );
  }

  companyCreated(e:any){
    this.show = !e
    this.GetCompaniesForDDL()
  }
}
