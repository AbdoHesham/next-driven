import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubitemlistRoutingModule } from './subitemlist-routing.module';
import { SubitemlistComponent } from './subitemlist/subitemlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { sharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SubitemlistComponent
  ],
  imports: [
    CommonModule,
    SubitemlistRoutingModule,
    sharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
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
export class SubitemlistModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
