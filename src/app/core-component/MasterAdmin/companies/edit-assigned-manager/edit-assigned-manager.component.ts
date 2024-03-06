import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyService } from 'src/@nextdriven/Services/company/company.service';

@Component({
  selector: 'app-edit-assigned-manager',
  templateUrl: './edit-assigned-manager.component.html',
  styleUrls: ['./edit-assigned-manager.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class EditAssignedManagerComponent implements OnInit {
  Form: FormGroup;
  managers: any;
  show: boolean = false;
  showmenu: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAssignedManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private CompanyService: CompanyService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.GetMnagersListToAssign();
  }

  initForm() {
    this.Form = this.fb.group({
      userCompanyRoleID: [this.defaults.userCompanyRoleID],
      FirstName: [''],
      lastName: [''],
      phoneNumber: [''],
      email: [''],
      userName: [''],
      Password: [''],
    });
  }

  GetMnagersListToAssign() {
    let body = {
      // pageIndex: 1,
      // pageSize: 10,
      organizationID: JSON.parse(
        localStorage.getItem('organizationID') || '{}'
      ),
    };

    this.CompanyService.GetMnagersListToAssign(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.managers = response.data;
        } else {
        }
      },
      (error: Error) => {
      }
    );
  }
  CreateManager() {
    let body = {
      firstName: this.Form.get('FirstName')?.value?.trim() || '',
      lastName: this.Form.get('lastName')?.value?.trim() || '',
      username: this.Form.get('userName')?.value?.trim() || '',
      password: this.Form.get('Password')?.value?.trim() || '',
      email: this.Form.get('email')?.value?.trim() || '',
      phoneNumber: this.Form.get('phoneNumber')?.value?.trim() || '',
      organizationID: JSON.parse(
        localStorage.getItem('organizationID') || '{}'
      ),
    };
    this.CompanyService.CreateManager(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.GetMnagersListToAssign();
          this.show = !this.show;

        } else {

          this.alertifyService.error(response.message);
        }
      },
      (error: Error) => {
        this.alertifyService.error('technical error ');
      }
    );
  }
  // cancel() {
  //   this.showmenu = !this.showmenu;
  //   this.show = !this.show;
  // }
  toggle() {
    this.show = !this.show;
  }

  submit() {
    let body = {
      userCompanyRoleID: this.Form.get('userCompanyRoleID')?.value,
      companyID: this.defaults.id,
    };

    this.CompanyService.AssignManagerToCompany(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.managers = response.data;
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
