import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';

@Component({
  selector: 'app-edit-license-date',
  templateUrl: './edit-license-date.component.html',
  styleUrls: ['./edit-license-date.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class EditLicenseDateComponent implements OnInit {
  startDate: any;
  endDate: any;
  Form: FormGroup;
  maxDate = new Date();
  showEndDate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService,
    private dialogRef: MatDialogRef<EditLicenseDateComponent>,
    @Inject(MAT_DIALOG_DATA) public defaults: any
  ) {}

  ngOnInit(): void {
    this.initForm();
    console.log(this.defaults);
  }

  initForm() {
    this.Form = this.fb.group({
      numberOfLicenseYears: [this.defaults.numberOfLicenseYears || 0 ],
    });

    this.startDate = new Date(this.defaults.licenseStartDate);
    this.endDate = new Date(this.defaults.licenseEndDate);
  }
  onSelectDate(e: any) {
    this.Form.controls['numberOfLicenseYears'].patchValue(0);
  }
  numberOfLicenseYearsSelect(e: any) {
    this.startDate = undefined;
    this.endDate = undefined;
  }
  submit() {
    // handle start and end date to return date plus one day
    let formattedStart = new Date(this.startDate);
    formattedStart.setDate(formattedStart.getDate() + 1);
    let formattedEnd = new Date(this.endDate);
    formattedEnd.setDate(formattedEnd.getDate() + 1);
    let body = {
      companyID: this.defaults.id,
      licenseStartDate: new Date(formattedStart),
      licenseEndDate: new Date(formattedEnd),
      "numberOfLicenseYears": this.Form.get('numberOfLicenseYears')?.value

    };

    this.CompanyService.UpdateCompanyLicensePeriod(body).subscribe(
      (response: ResponseDto) => {
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
