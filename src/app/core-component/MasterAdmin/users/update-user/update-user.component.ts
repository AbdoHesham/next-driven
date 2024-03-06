import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { UsersService } from 'src/@nextdriven/Services/users/users.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated

})
export class UpdateUserComponent implements OnInit {
  countries: any;
  cities: any;
  districts: any;
  Form: FormGroup;
  organizationID = JSON.parse(localStorage.getItem('organizationID') || '{}');

  constructor(
    private fb: FormBuilder,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    public SharedService: SharedService,
    private UsersService:UsersService
  ) {}

  ngOnInit(): void {
    console.log(this.defaults);
    this.initForm();
  }

  initForm() {
    this.Form = this.fb.group({
      firstName: [
        this.defaults.fullName.split(' ')[0],
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      lastName: [
        this.defaults.fullName.split(' ')[1],
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(Patterns.lettersorsymbolsorspaces),
        ],
      ],
      Email: [this.defaults.email, [Validators.required, Validators.email]],
      phoneNumber: [this.defaults.phoneNumber, [Validators.required]],
      // assignrole: [this.defaults.],
      defaultPrinter: [
        this.defaults.defaultPrinter,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      kitchenPrinter: [
        this.defaults.kitchenPrinter,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      userName: [this.defaults.userName, Validators.required],
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

  submit() {
    let body = {
      firstName: this.Form.get('firstName')?.value,
      lastName: this.Form.get('lastName')?.value,
      username: this.Form.get('userName')?.value,
      // password: this.Form.get('Password')?.value,
      phoneNumber: this.Form.get('phoneNumber')?.value,
      email: this.Form.get('Email')?.value,
      organizationID: this.organizationID,
      userRole : this.defaults.userRole,
      companyID: this.defaults.companyID,
      defaultPrinter: this.Form.get('defaultPrinter')?.value,
      kitchenPrinter: this.Form.get('kitchenPrinter')?.value,
      "customRoleID": 0,

    };

    this.UsersService.CreateUserWithAssignCompany(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.dialogRef.close('reload');
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
