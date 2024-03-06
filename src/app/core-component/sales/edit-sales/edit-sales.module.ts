import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ng2-datepicker';
import { EditSalesRoutingModule } from './edit-sales-routing.module';
import { EditSalesComponent } from './edit-sales.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [EditSalesComponent],
  imports: [
    CommonModule,
    EditSalesRoutingModule,
    DatepickerModule,
    sharedModule,
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
  
  
  bootstrap: [EditSalesComponent],
})
export class EditSalesModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}