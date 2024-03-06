import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddsupplierRoutingModule } from './addsupplier-routing.module';
import { AddsupplierComponent } from './addsupplier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AddsupplierComponent
  ],
  imports: [
    CommonModule,
    AddsupplierRoutingModule,
    ReactiveFormsModule,
    sharedModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),],
  
})
export class AddsupplierModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}