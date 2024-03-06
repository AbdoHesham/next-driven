
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyManagerService } from 'src/@nextdriven/Services/company-manager/company-manager.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { routes } from 'src/app/core/core.index';
@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss']
})
export class EditSettingComponent {
  public routes = routes;
  companySetting: any;
  constructor(
    public SharedService: SharedService,
    public fb: FormBuilder,
    private router: Router,
    private CompanyManagerService: CompanyManagerService,
    private alertifyService: AlertifyService
  ) {}
  Form: FormGroup;
  @ViewChild('toggleTimepicker') toggleTimepicker: ElementRef;
  ngOnInit(): void {
    this.initForm();
    this.GetCompanySettings();
  }
  GetCompanySettings() {
    this.CompanyManagerService.GetCompanySettings().subscribe(
      (res: ResponseDto) => {
        if (res.isPassed == true) {
          this.companySetting = res.data;
          if (this.companySetting !== null) {
            this.initFormAfterDetails();
          }
        } else {
          this.alertifyService.error(res.message);
        }
      },
      (err) => {
      }
    );
  }
  initFormAfterDetails() {

    this.Form.get('startHour')?.patchValue(this.companySetting.startHour);
    this.Form.get('endHour')?.patchValue(this.companySetting.endHour);
    this.Form.get('isMidnightShift')?.patchValue(
      this.companySetting.isMidnightShift
    );
    this.Form.get('isShowMenu')?.patchValue(this.companySetting.isShowMenu);
    this.Form.get('printerLayout')?.patchValue(
      this.companySetting.printerLayout
    );
    this.Form.get('isDefaultBarcode')?.patchValue(
      this.companySetting.isDefaultBarcode
    );
    this.Form.get('companyType')?.patchValue(this.companySetting.type);
    this.Form.get('IsPriceIncludeVAT')?.patchValue(
      this.companySetting.isPriceIncludeVAT
    );
    this.Form.get('isServerConnection')?.patchValue(
      this.companySetting.isServerConnection
    );
    this.Form.get('totalNoOfDigits')?.patchValue(
      this.companySetting.totalNoOfDigits
    );
    this.Form.get('pluStartingPosition')?.patchValue(
      this.companySetting.pluStartingPosition
    );
    this.Form.get('priceStartingPosition')?.patchValue(
      this.companySetting.priceStartingPosition
    );
    this.Form.get('prefix')?.patchValue(this.companySetting.prefix);
    this.Form.get('noOfDigitsInPLU')?.patchValue(
      this.companySetting.noOfDigitsInPLU
    );
    this.Form.get('noOfDigitsInPrice')?.patchValue(
      this.companySetting.noOfDigitsInPrice
    );
    this.Form.get('topInch')?.patchValue(this.companySetting.topInch);
    this.Form.get('bottomInch')?.patchValue(this.companySetting.bottomInch);

  }

  initForm() {
    this.Form = this.fb.group({
      startHour: ['', [Validators.required]],
      endHour: ['', [Validators.required]],
      isMidnightShift: [false, [Validators.required]],
      isShowMenu: [false, [Validators.required]],
      printerLayout: ['', [Validators.required]],
      isDefaultBarcode: [false, [Validators.required]],
      isServerConnection: [false, [Validators.required]],

      totalNoOfDigits: [0, [Validators.required]],
      pluStartingPosition: [0, [Validators.required]],
      priceStartingPosition: [0, [Validators.required]],
      prefix: [0, [Validators.required]],
      noOfDigitsInPLU: [0, [Validators.required]],
      noOfDigitsInPrice: [0, [Validators.required]],
      topInch: [0, [Validators.required]],
      bottomInch: [0, [Validators.required]],
    });
  }
  goToTabs() {
    this.router.navigateByUrl(this.routes.importTransfer);
  }
  time = { hour: 13, minute: 30 };
  show = true;
  meridian = true;

  submit() {
    console.log(this.toggleTimepicker);

    let body = {
      id: this.companySetting == null ? 0 : this.companySetting.id,
      startHour: this.Form.get('startHour')?.value,
      endHour: this.Form.get('endHour')?.value,
      printerLayout: this.Form.get('printerLayout')?.value,
      isMidnightShift: this.Form.get('isMidnightShift')?.value,
      isShowMenu: this.Form.get('isShowMenu')?.value,
      isDefaultBarcode: this.Form.get('isDefaultBarcode')?.value,
      isServerConnection: this.Form.get('isServerConnection')?.value,
      totalNoOfDigits: this.Form.get('totalNoOfDigits')?.value,
      pluStartingPosition: this.Form.get('pluStartingPosition')?.value,
      priceStartingPosition: this.Form.get('priceStartingPosition')?.value,
      prefix: this.Form.get('prefix')?.value,
      noOfDigitsInPLU: this.Form.get('noOfDigitsInPLU')?.value,
      noOfDigitsInPrice: this.Form.get('noOfDigitsInPrice')?.value,
      topInch: this.Form.get('topInch')?.value,
      bottomInch: this.Form.get('bottomInch')?.value,
    };
    console.log(body);

    this.CompanyManagerService.SaveCompanySettings(body).subscribe(
      (response: any) => {
        if (response.isPassed == true) {
          this.alertifyService.success(response.message);
          this.goToTabs();
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
