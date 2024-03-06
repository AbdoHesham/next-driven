import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ng2-datepicker';
import { EdittransferRoutingModule } from './edittransfer-routing.module';
import { EdittransferComponent } from './edittransfer.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [EdittransferComponent],
  imports: [
    CommonModule,
    EdittransferRoutingModule,
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
  
})
export class EdittransferModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}