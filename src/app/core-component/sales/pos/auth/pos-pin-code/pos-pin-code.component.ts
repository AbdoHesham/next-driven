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
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-pos-pin-code',
  templateUrl: './pos-pin-code.component.html',
  styleUrls: ['./pos-pin-code.component.scss'],
})
export class POSPinCodeComponent implements OnInit {
  @ViewChild('pinCode') pinContainer: any;
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
  constructor(
    private fb: FormBuilder,
    public SharedService: SharedService,
    private router: Router,
    private alertifyService: AlertifyService,
    private AuthService: AuthService,
    private permissionsService: NgxPermissionsService
  ) {
    this.Form = this.fb.group({
      digits: this.fb.array([]),
    });
  }
  get addDynamicElement() {
    return this.Form.get('digits') as FormArray;
  }

  initForm() {

    for (let i = 0; i < this.numOfDigits; i++) {
      (this.Form.get('digits') as FormArray).push(this.fb.control(null));
    }
  }

  ngOnInit(): void {
    this.initForm();
  }
  changePassword: boolean = false;
  login() {
    let code =''
    console.log(this.Form.value);
    this.Form.value.digits.forEach((e:any) => {

      code +=e
    });
    let body ={
      pinCode: code
    }

    
    this.AuthService.VerifyPINCode(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.alertifyService.success('you are loggedIn successfully ');
          localStorage.setItem('isRegisterOpened', JSON.stringify(true));

          this.router.navigateByUrl('sales/pos')

          
        } else {
          
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        
        this.alertifyService.error('technical error ');
      }
    );
    // this.router.navigateByUrl('/pos-auth/pin-code');
  }


  resetCodeInput() {
    this.Form.reset();
  }
  removeLastIndexInCode() {
    console.log(this.addDynamicElement.controls);
    // for (let i = 0; i < this.addDynamicElement.controls.length  ; i++) {

    //   if (this.addDynamicElement.controls.length -1 !== null) {
    //     this.addDynamicElement.controls[i-1].patchValue(null);
    //     this.inputs.toArray()[i-1].nativeElement.focus();
    //     break
    //   }

    //   }
    this.addDynamicElement.controls.pop()
  }
  btnClick(number: any) {
    for (let i = 0; i < this.addDynamicElement.controls.length  ; i++) {

      if (this.addDynamicElement.controls[i].value !== null) {
        this.inputs.toArray()[i].nativeElement.focus();
      }
      else{
        this.addDynamicElement.controls[i].patchValue(number);
        break;
      }
      }
  }

  check(index: any, field: any, event: any ) {
    if (isNaN(parseInt(event.key, 10)) && event.key !== 'Backspace') {
      event.preventDefault();
    }
    if (field.value && event.key !== 'Backspace') {
      if (index < this.inputs.toArray().length - 1) {
        this.inputs.toArray()[index + 1].nativeElement.focus();
      }
    } else if (event.key === 'Backspace') {
      if (index > 0) {
        field.setValue(null);
        this.inputs.toArray()[index - 1].nativeElement.focus();
      } else {
        console.log('first field');
      }
    }
  }

  confirmCode(e: any) {
    console.log(e);
  }
}
