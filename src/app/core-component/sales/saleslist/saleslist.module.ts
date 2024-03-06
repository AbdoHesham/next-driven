import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ng2-datepicker';
import { SaleslistRoutingModule } from './saleslist-routing.module';
import { SaleslistComponent } from './saleslist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { sharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SaleslistComponent],
  imports: [
    CommonModule,
    SaleslistRoutingModule,
    sharedModule,
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
  
  
  bootstrap: [SaleslistComponent],
})
export class SaleslistModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
