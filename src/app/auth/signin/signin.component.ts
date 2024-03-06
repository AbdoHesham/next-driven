import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { login } from 'src/@nextdriven/Models/auth/login';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { AuthService } from 'src/@nextdriven/Services/auth.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { routes } from 'src/app/core/helpers/routes';
import { WebstorgeService } from 'src/app/shared/webstorge.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public routes = routes;
  password: any;
  show = false;
  public CustomControler: any;
  form :FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      Validators.pattern(Patterns.complexPassword),
    ]),
  });
  changePassword: boolean;
  
  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    public SharedService: SharedService,
    private router: Router,
    // private spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private AuthService: AuthService,
    private permissionsService:NgxPermissionsService
  ) {}

  ngOnInit() {
    this.password = 'password';
  }

  submit() {
    let body: login = {
      username: this.form.get('email')?.value.trim(),
      password: this.form.get('password')?.value.trim(),
    };
    // const Roles =[]
    // this.spinner.show();
    this.AuthService.Login(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.alertifyService.success('you are loggedIn successfully ');
          this.changePassword = response.data['changePassword'];
          const Roles = [response.data.userRoleStr];
          const userName= response.data.userName;
          localStorage.setItem('Role', JSON.stringify(Roles));
          localStorage.setItem('userName', JSON.stringify(userName));

          
          const accessToken = response.data.accessToken;
          localStorage.setItem(
            'nextdriven_user',
            JSON.stringify(response.data)
          );
          const isFirstLogin = response.data.isFirstLogin;
          localStorage.setItem('isFirstLogin', JSON.stringify(isFirstLogin));
          const email = response.data.email;
          localStorage.setItem('email', JSON.stringify(email));
          this.SharedService.setProp(this.changePassword);
          localStorage.setItem(
            'changePassword',
            JSON.stringify(this.changePassword)
          );
          this.SharedService.setFirstLoginProp(isFirstLogin);
          localStorage.setItem(
            'organizationID',
            JSON.stringify(response.data.organizationID)
          );
          localStorage.setItem(
            'companyID',
            JSON.stringify(response.data.companyID)
          );

          const isOrganizationFound =
            response.data.organizationID !== null ? true : false;

          // this.SharedService.setPropOrg(isOrganizationFound);
          if (response.data.changePassword == false) {
            this.router.navigateByUrl('/auth/change-password');
          } else {
            if (
              JSON.parse(localStorage.getItem('Role') || '{}').includes(
                'MasterAdmin'
              )
            ) {
              if (response.data.isFirstLogin == true) {
                this.router.navigateByUrl('/auth/otp');
              } else {
                if (
                  JSON.parse(localStorage.getItem('Role') || '{}').includes(
                    'MasterAdmin'
                  )
                )
                {
                  this.permissionsService.loadPermissions(Roles);
                  console.log('role master');
                  this.router.navigateByUrl('/master-admin/organization');

                }
                else {
                  console.log('role not master');
                  this.router.navigateByUrl('/dashboard');
                }
              }
            }
            else {
              console.log('role not master');
              this.router.navigateByUrl('/dashboard');
            }
          }

          // this.spinner.hide();
        } else {
          // this.spinner.hide();
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        // this.spinner.hide();
        this.alertifyService.error('technical error ');
      }
    );
  }
  ngOnDestroy() {}

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
