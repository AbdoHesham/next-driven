import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ng2-datepicker';
import { QuotationListRoutingModule } from './quotation-list-routing.module';
import { QuotationListComponent } from './quotation-list.component';


import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [QuotationListComponent],
  imports: [
    CommonModule,
    QuotationListRoutingModule,
    sharedModule,
    DatepickerModule,
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
  
  bootstrap: [QuotationListComponent],
})
export class QuotationListModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
