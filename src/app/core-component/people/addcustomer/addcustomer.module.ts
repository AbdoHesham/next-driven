import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcustomerRoutingModule } from './addcustomer-routing.module';
import { AddcustomerComponent } from './addcustomer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AddcustomerComponent
  ],
  imports: [
    CommonModule,
    AddcustomerRoutingModule,
    FormsModule,
   sharedModule,
    ReactiveFormsModule,
   
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),],
  
})
export class AddcustomerModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}