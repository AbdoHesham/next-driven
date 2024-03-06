import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ng2-datepicker';
import { EditquotationRoutingModule } from './editquotation-routing.module';
import { EditquotationComponent } from './editquotation.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [EditquotationComponent],
  imports: [
    CommonModule,
    EditquotationRoutingModule,
    DatepickerModule,
    sharedModule,
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
  
  bootstrap: [EditquotationComponent],
})
export class EditquotationModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
