import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';

@Component({
  selector: 'app-edit-assigned-company',
  templateUrl: './edit-assigned-company.component.html',
  styleUrls: ['./edit-assigned-company.component.scss'],
  encapsulation: ViewEncapsulation.Emulated

})
export class EditAssignedCompanyComponent implements OnInit {
  CompaniesForDDL: any;
  altCompaniesForDDL: any;
  Form:FormGroup
  show:boolean=false
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAssignedCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit(): void {
    console.log(this.defaults);
    this.initForm()
    this.GetCompaniesForDDL()
  }
  initForm() {
    this.Form = this.fb.group({
      companyID: [0],
    });
  }

  GetCompaniesForDDL() {
    let body = {
      pageIndex: 1,
      pageSize: 10,
      organizationID: JSON.parse(localStorage.getItem('organizationID') || '{}'),
    };

    this.CompanyService.GetCompaniesForDDL(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.CompaniesForDDL = response.data;
          this.altCompaniesForDDL = this.CompaniesForDDL;
        } else {

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
      }
    );
  }
  toggle() {
    this.show = !this.show;
  }
  companyCreated(e:any){
    this.show = !e
    this.GetCompaniesForDDL()
  }
  submit() {
    let body = {
      userCompanyRoleID:this.defaults.userCompanyRoleID ,
      companyID: this.Form.get('companyID')?.value,
    };

    this.CompanyService.AssignManagerToCompany(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.dialogRef.close('reload')

        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
      }
    );
  }

}
