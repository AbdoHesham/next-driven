import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewusereditRoutingModule } from './newuseredit-routing.module';
import { NewusereditComponent } from './newuseredit.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewusereditComponent
  ],
  imports: [
    CommonModule,
    NewusereditRoutingModule,
    
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
     }),
  
  
  ]
})
export class NewusereditModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
