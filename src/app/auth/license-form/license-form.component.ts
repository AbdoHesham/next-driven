import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { AuthService } from 'src/@nextdriven/Services/auth.service';
import { License_key } from 'src/@nextdriven/Models/auth/LicenseKey';

@Component({
  selector: 'app-license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.scss'],
})
export class LicenseFormComponent implements OnInit {
  constructor(private fb: FormBuilder,
     private router: Router,
    private alertifyService: AlertifyService,
    private AuthService: AuthService
     ) {}

  ngOnInit(): void {}
  license_Form = this.fb.group({
    License_key: ['', Validators.required],
  });
  Submit() {
    let body: License_key = {
      licenseKey: this.license_Form.get('License_key')?.value?.trim() || ''
    };

    
    this.AuthService.ConfirmLicenseKey(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success('License Key verified successfully');
          this.router.navigateByUrl('/master-admin/organization/create');

          
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
