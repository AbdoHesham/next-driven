import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditproductRoutingModule } from './editproduct-routing.module';
import { EditproductComponent } from './editproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    EditproductComponent
  ],
  imports: [
    CommonModule,
    EditproductRoutingModule,
    FormsModule,
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
export class EditproductModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
