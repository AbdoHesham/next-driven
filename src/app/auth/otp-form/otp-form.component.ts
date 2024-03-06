import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { AuthService } from 'src/@nextdriven/Services/auth.service';
import { OTPNumber } from 'src/@nextdriven/Models/auth/OTP';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss']
})
export class OTPFormComponent implements OnInit {


  constructor(private fb: FormBuilder,
    private router: Router,
    private alertifyService: AlertifyService,
    private AuthService: AuthService

  ) {

  }




  ngOnInit(): void {
  }
  otpForm = this.fb.group({
    otp: ['', Validators.required]

  })
  verify() {

    let body: OTPNumber = {
      otp: this.otpForm.get('otp')?.value?.trim() || ''
    };

    this.AuthService.VerifyOTP(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.alertifyService.success('OTP Number verified successfully');
          this.router.navigateByUrl('/auth/license');
        } else {
          this.alertifyService.error('technical error ');
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );

    

  }

}
