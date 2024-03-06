import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImporttransferRoutingModule } from './importtransfer-routing.module';
import { ImporttransferComponent } from './importtransfer.component';
import { sharedModule } from 'src/app/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DatepickerModule } from 'ng2-datepicker';

@NgModule({
  declarations: [
    ImporttransferComponent
  ],
  imports: [
    CommonModule,
    ImporttransferRoutingModule,
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
  
})
export class ImporttransferModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
