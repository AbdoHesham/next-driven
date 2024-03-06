import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { AuthService } from 'src/@nextdriven/Services/auth.service';
import { login } from 'src/@nextdriven/Models/auth/login';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { NgxPermissionsService } from 'ngx-permissions';
import { Patterns } from 'src/@nextdriven/Constants/patterns';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pos-login',
  templateUrl: './pos-login.component.html',
  styleUrls: ['./pos-login.component.scss'],
})
export class POSLoginComponent implements OnInit {
  userCredentials: {} = {};
  show: boolean = false;
  data: any;
  Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public SharedService: SharedService,
    private router: Router,
    private alertifyService: AlertifyService,
    private AuthService: AuthService,
    private permissionsService: NgxPermissionsService,
    private dialog: MatDialog
  ) {
    this.dialog.afterAllClosed.subscribe(() => {
      console.log('All dialogs closed');
    });
  }
  initForm() {
    this.Form = this.fb.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern(Patterns.complexPassword),
      ]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.Form.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }
  changePassword: boolean = false;
  login() {
    let body: login = {
      username: this.Form.get('email')?.value.trim(),
      password: this.Form.get('password')?.value.trim(),
    };
    this.AuthService.Login(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.alertifyService.success('you are loggedIn successfully ');
          localStorage.setItem('posLogin', JSON.stringify(true));
          this.router.navigateByUrl('sales/pos/auth/pin-code');
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
