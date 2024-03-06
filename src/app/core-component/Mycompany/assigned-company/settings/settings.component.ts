import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseDto } from 'src/@nextdriven/Models/Common/response';
import { AlertifyService } from 'src/@nextdriven/Services/alertify.service';
import { CompanyManagerService } from 'src/@nextdriven/Services/company-manager/company-manager.service';
import { SharedService } from 'src/@nextdriven/Services/shared.service';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public routes = routes;

  companySetting: any;
  constructor(
    public SharedService: SharedService,
    public fb: FormBuilder,
    private router: Router,
    private CompanyManagerService: CompanyManagerService,
    private alertifyService: AlertifyService,

    
  ) {}
  Form: FormGroup;

  GetCompanySettings() {
    this.CompanyManagerService.GetCompanySettings().subscribe(
      (res: ResponseDto) => {
        if (res.isPassed == true) {
          this.companySetting=res.data
          if(this.companySetting !== null ){
            this.initFormAfterDetails()
          }
        } else {
           this.alertifyService.error(res.message);

        }
      },
      (err) => {
      }
    );
  }
  ngOnInit(): void {
    this.initForm();
    this.GetCompanySettings();
  }

  initForm(){
    this.Form = this.fb.group({
      startHour: [''],
      endHour: [''],
      isMidnightShift: [''],
      isShowMenu: [''],
      printerLayout: [''],
      isDefaultBarcode: [''],
      isServerConnection: [''],
      totalNoOfDigits: [''],
      pluStartingPosition: [''],
      priceStartingPosition: [''],
      prefix: [''],
      noOfDigitsInPLU: [''],
      noOfDigitsInPrice: [''],
      topInch: [''],
      bottomInch: [''],
    });

  }
  initFormAfterDetails() {

    this.Form.get('startHour')?.patchValue(this.companySetting.startHour);
    this.Form.get('endHour')?.patchValue(this.companySetting.endHour);
    this.Form.get('isMidnightShift')?.patchValue(
      this.companySetting.isMidnightShift
    );
    this.Form.get('isShowMenu')?.patchValue(this.companySetting.isShowMenu);
    this.Form.get('printerLayout')?.patchValue(this.companySetting.printerLayout);
    this.Form.get('isDefaultBarcode')?.patchValue(this.companySetting.isDefaultBarcode);
    this.Form.get('companyType')?.patchValue(this.companySetting.type);
    this.Form.get('IsPriceIncludeVAT')?.patchValue(
      this.companySetting.isPriceIncludeVAT
    );
    this.Form.get('isServerConnection')?.patchValue(this.companySetting.isServerConnection);
    this.Form.get('totalNoOfDigits')?.patchValue(this.companySetting.totalNoOfDigits);
    this.Form.get('pluStartingPosition')?.patchValue(this.companySetting.pluStartingPosition);
    this.Form.get('priceStartingPosition')?.patchValue(this.companySetting.priceStartingPosition);
    this.Form.get('prefix')?.patchValue(
      this.companySetting.prefix
    );
    this.Form.get('noOfDigitsInPLU')?.patchValue(this.companySetting.noOfDigitsInPLU);
    this.Form.get('noOfDigitsInPrice')?.patchValue(this.companySetting.noOfDigitsInPrice);
    this.Form.get('topInch')?.patchValue(this.companySetting.topInch);
    this.Form.get('bottomInch')?.patchValue(this.companySetting.bottomInch);
  }


}


