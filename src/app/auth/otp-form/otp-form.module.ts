import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpFormRoutingModule } from './otp-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { OTPFormComponent } from './otp-form.component';

@NgModule({
  declarations: [OTPFormComponent],
  imports: [
    CommonModule,
    OtpFormRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class OtpFormModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
