import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddstoreRoutingModule } from './addstore-routing.module';
import { AddstoreComponent } from './addstore.component';

import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddstoreComponent
  ],
  imports: [
    CommonModule,
    AddstoreRoutingModule,
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

export class AddstoreModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
