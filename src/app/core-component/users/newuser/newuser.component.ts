import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyManagerService } from 'src/@nextdriven/Services/company-manager/company-manager.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { routes } from 'src/app/core/helpers/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from 'rxjs';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss'],
})
export class NewuserComponent implements OnInit {
  password = 'password';
  show = false;
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
  roles: any;
  CompaniesForDDL: any;
  altCompaniesForDDL: any;
  altRoles: any;
  CustomRolesForDDL: any;
  showDefaultRoleDDL: boolean = false;
  showCustomRoleDDL: boolean = false;
  defaults: any;

  constructor(
    private fb: FormBuilder,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService,
    private CompanyManagerService: CompanyManagerService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}
  Form: FormGroup;
  Form2: FormGroup;
  //show: boolean = false;
  maxDate = new Date();
  isLinear = false;
  organizationID = JSON.parse(localStorage.getItem('organizationID') || '{}');

  companyID = JSON.parse(localStorage.getItem('companyID') || '{}');
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
      companyID: this.companyID,
      defaultRole: [0, [Validators.required]],
      customRoleID: [0, [Validators.required]],
      assignrole: [null, [Validators.required]],

    });

  }
  initFormInEdit() {
    console.log('initFormInEdit');
    
    this.Form = this.fb.group({
      firstName: [
        this.defaults[0].firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      lastName: [
        this.defaults[0].lastName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      Email: [this.defaults[0].email, [Validators.required, Validators.email]],
      phoneNumber: [this.defaults[0].phoneNumber, [Validators.required]],
      // defaultRole: [this.defaults[0].],
      defaultPrinter: [
        this.defaults[0].defaultPrinter,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      kitchenPrinter: [
        this.defaults[0].kitchenPrinter,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      userName: [this.defaults[0].userName, Validators.required],
      customRoleID:[this.defaults[0].userCompanyRoleID],
      defaultRole: [this.defaults[0].userRole],
      assignrole: [],

      // Password: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.minLength(8),
      //     Validators.maxLength(50),
      //     Validators.pattern(Patterns.complexPassword),
      //   ],
      // ],
    });
  }
  isEditable = false;

  ngOnInit(): void {
    this.initForm();
    this.GetNeeds();
    this.GetCustomRolesForDDL();

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    console.log(this.id !== 'id');

    if (this.id !== '0') this.SearchByCompanyOrUserName(this.id);
  }
  SearchByCompanyOrUserName(searchKey: string) {
    let body = {
      pageIndex: 1,
      pageSize: 10,
      username: searchKey,
      // "organizationID": JSON.parse(localStorage.getItem('organizationID')||'{}')
    };
    this.CompanyManagerService.SearchByCompanyOrUserName(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.defaults = response.data 
          this.defaults = this.defaults.filter((obj:any)=>{
            return obj.userName ==searchKey
           });
          console.log(this.defaults);
          
          this.initFormInEdit();
          this.onSelectRoleInUpdate()
        } else {
        }
      },
      (error: Error) => {}
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
          this.roles = response.data.roles;
          this.altRoles = this.roles;
          this.altRoles = this.altRoles.filter((r: any) => {
            return r.id !== 2;
          });
          console.log(this.altRoles);
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
      firstName: this.Form.get('firstName')?.value,
      lastName: this.Form.get('lastName')?.value,
      username: this.Form.get('userName')?.value,
      password: this.Form.get('Password')?.value,
      phoneNumber: this.Form.get('phoneNumber')?.value,
      email: this.Form.get('Email')?.value,
      organizationID: this.organizationID,
      userRole: this.Form.get('defaultRole')?.value,
      companyID: this.Form.get('companyID')?.value,
      defaultPrinter: this.Form.get('defaultPrinter')?.value,
      kitchenPrinter: this.Form.get('kitchenPrinter')?.value,
      customRoleID: this.Form.get('customRoleID')?.value,
      pinCode: this.id !== 0 ? this.Form.get('pinCode')?.value.trim() : null ,
    };

    console.log(body);
    console.log(this.id);
    
    this.CompanyManagerService.SaveUser(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.router.navigateByUrl('/users/user-lists');
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  onSelectRole(e: any) {
    console.log(e.target.value);
    if (e.target.value == 'Default') {
      this.showDefaultRoleDDL = true;
      this.showCustomRoleDDL = false;
      this.Form.get('defaultRole')?.setValidators([Validators.required]);
      this.Form.get('customRoleID')?.setValidators([]);
    } else if (e.target.value == 'Custom') {
      this.showDefaultRoleDDL = false;
      this.showCustomRoleDDL = true;
      this.Form.get('defaultRole')?.setValidators([]);
      this.Form.get('customRoleID')?.setValidators([Validators.required]);
    }
  }
  onSelectRoleInUpdate() {
    if (this.defaults[0].userRole !== 0) {
      this.showDefaultRoleDDL = true;
      this.showCustomRoleDDL = false;
      this.Form.get('defaultRole')?.setValidators([Validators.required]);
      this.Form.get('customRoleID')?.setValidators([]);
    } else if (this.defaults[0].userCompanyRoleID !== 0) {
      this.showDefaultRoleDDL = false;
      this.showCustomRoleDDL = true;
      this.Form.get('defaultRole')?.setValidators([]);
      this.Form.get('customRoleID')?.setValidators([Validators.required]);
    }
  }
  GetCustomRolesForDDL() {
    this.CompanyManagerService.GetCustomRolesForDDL().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.CustomRolesForDDL = response.data;
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {}
    );
  }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
