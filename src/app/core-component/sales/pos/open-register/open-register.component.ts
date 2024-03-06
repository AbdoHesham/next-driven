import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
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
import { QueryParamsDto, ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { NgxPermissionsService } from 'ngx-permissions';
import { MatDialogRef } from '@angular/material/dialog';
import { OpenRegisterService } from 'src/@nextdriven/Services/OpenRegister/open-register.service';
@Component({
  selector: 'app-open-register',
  templateUrl: './open-register.component.html',
  styleUrls: ['./open-register.component.scss'],
})
export class OpenRegisterComponent implements OnInit {
  // pinContainer=document.querySelector(".pin-code");
  // @ViewChild('inp1') inp1 :ElementRef;

  // inp1 = document.getElementById('inp1')
  @ViewChildren('inputs') inputs: QueryList<any>;

  userCredentials: {} = {};
  show: boolean = false;
  data: any;
  Form: FormGroup;
  Form2: FormGroup;
  numOfDigits: number = 6;
  currentField: any;
  code: string = '';
  constructor(
    private fb: FormBuilder,
    public SharedService: SharedService,
    private router: Router,
    private alertifyService: AlertifyService,
    private OpenRegisterService: OpenRegisterService,
    private dialogRef: MatDialogRef<OpenRegisterComponent>
  ) {}

  ngOnInit(): void {
    this.LastOpenCloseRegister();
  }
  changePassword: boolean = false;

  LastOpenCloseRegister() {
    this.OpenRegisterService.LastOpenCloseRegister().subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.alertifyService.success('you are loggedIn successfully ');
          this.data = response.data;
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  openRegister() {

    let params: QueryParamsDto[] = [
      {
        key: 'openingAmount',
        value: +this.code
      },
    ];
    this.OpenRegisterService.OpenNewRegister(params).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.alertifyService.success('you are loggedIn successfully ');
          this.data = response.data;
          localStorage.setItem('isRegisterOpened', JSON.stringify(false));

        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
    this.dialogRef.close();
  }

  resetCodeInput() {
    this.code = '';
  }
  removeLastIndexInCode() {
    this.code = this.code.substring(0, this.code.length - 1);
  }
  btnClick(number: any) {
    this.code += number;
    console.log(this.code);
  }
}
