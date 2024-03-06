import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ng2-datepicker';
import { ExpenselistRoutingModule } from './expenselist-routing.module';
import { ExpenselistComponent } from './expenselist.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ExpenselistComponent],
  imports: [
    CommonModule,
    ExpenselistRoutingModule,
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
  
  bootstrap: [ExpenselistComponent],
})
export class ExpenselistModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
