import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { OpenRegisterService } from 'src/@nextdriven/Services/OpenRegister/open-register.service';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';

@Component({
  selector: 'app-close-register',
  templateUrl: './close-register.component.html',
  styleUrls: ['./close-register.component.scss'],
})
export class CloseRegisterComponent {
  Form: FormGroup;
  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private OpenRegisterService: OpenRegisterService,
    private alertifyService: AlertifyService,
    private dialogRef: MatDialogRef<CloseRegisterComponent>
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.Form = this.fb.group({
      closingAmount: [null, [Validators.required]],
      cashSales: [null, [Validators.required]],
      refunds: [null, [Validators.required]],
    });
  }
  closeRegister() {
    let body = {
      closingAmount: this.Form.value['closingAmount'],
      cashSales: this.Form.value['cashSales'],
      refunds: this.Form.value['refunds'],
    };

    this.OpenRegisterService.CloseRegister(body).subscribe(
      (response: ResponseDto) => {
        if (response.isPassed == true) {
          this.alertifyService.success('closed successfully ');

          this.dialogRef.close();
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
