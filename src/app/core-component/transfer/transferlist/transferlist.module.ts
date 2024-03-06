import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferlistRoutingModule } from './transferlist-routing.module';
import { TransferlistComponent } from './transferlist.component';
import { DatepickerModule } from 'ng2-datepicker';
import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TransferlistComponent
  ],
  imports: [
    CommonModule,
    TransferlistRoutingModule,

    sharedModule,
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
  

  
 bootstrap: [TransferlistComponent]

})
export class TransferlistModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
