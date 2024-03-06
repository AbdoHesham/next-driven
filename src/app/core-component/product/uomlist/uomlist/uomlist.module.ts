import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UomlistRoutingModule } from './uomlist-routing.module';
import { UomlistComponent } from './uomlist.component';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UomlistComponent
  ],
  imports: [
    CommonModule,
    UomlistRoutingModule,
    FormsModule,
    sharedModule,
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
export class UomlistModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
