
import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  countries: any;
  cities: any;
  districts: any;

  constructor(
    private fb: FormBuilder,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService,
    private dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    public SharedService: SharedService,

  ) { }

  ngOnInit(): void {
    console.log(this.defaults);
    this.GetNeeds()
    
  }
  GetNeeds() {

    this.CompanyService.GetNeeds().subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          // this.vatTypes = response.data.vatTypes;
          // this.companyTypes = response.data.companyTypes;
          this.countries = response.data.countries;
          this.cities = response.data.cities;
          this.districts = response.data.districts;

        } else {

          // this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
}
