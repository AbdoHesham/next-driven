import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LicenseFormComponent } from './license-form/license-form.component';
import { OTPFormComponent } from './otp-form/otp-form.component';

@NgModule({
  declarations: [
    AuthComponent 
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
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
export class AuthModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}