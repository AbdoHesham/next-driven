import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ng2-datepicker';
import { AddSalesRoutingModule } from './add-sales-routing.module';
import { AddSalesComponent } from './add-sales.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [AddSalesComponent],
  imports: [
    CommonModule,
    AddSalesRoutingModule,
    DatepickerModule,
    sharedModule,
   
    DatepickerModule,
    FormsModule,
   
     ReactiveFormsModule,
    
     TranslateModule.forChild({
       loader: {
         provide: TranslateLoader,
         useFactory: httpTranslateLoader,
         deps: [HttpClient]
       },
       isolate: false
      }),],
  
  

  bootstrap: [AddSalesComponent],
})
export class AddSalesModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}