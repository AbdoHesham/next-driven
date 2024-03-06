import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdduserRoutingModule } from './adduser-routing.module';
import { AdduserComponent } from './adduser.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdduserComponent
  ],
  imports: [
    CommonModule,
    AdduserRoutingModule,
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
export class AdduserModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}