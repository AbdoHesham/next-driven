import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseFormRoutingModule } from './license-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LicenseFormComponent } from './license-form.component';

@NgModule({
  declarations: [LicenseFormComponent],
  imports: [
    CommonModule,
    LicenseFormRoutingModule,
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
export class LicenseFormModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
