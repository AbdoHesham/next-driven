import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  password='password'
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
  constructor(
    private fb: FormBuilder
   
  ) {}
  Form: FormGroup;
  Form2: FormGroup;
  //show: boolean = false;
  maxDate = new Date();
  isLinear = false;
  organizationID = JSON.parse(localStorage.getItem('organizationID') || '{}');

  companyID= JSON.parse(localStorage.getItem('companyID') || '{}');
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

    });

    this.Form2 = this.fb.group({
      companyID: this.companyID,
      assignrole: [0],
      customRoleID: [0],

    });
  }
  isEditable = false;

  ngOnInit(): void {
    this.initForm();
   
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
