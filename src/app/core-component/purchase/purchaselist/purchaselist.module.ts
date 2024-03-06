import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ng2-datepicker';

import { PurchaselistRoutingModule } from './purchaselist-routing.module';
import { PurchaselistComponent } from './purchaselist.component';


import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [PurchaselistComponent],
  imports: [
    CommonModule,
    PurchaselistRoutingModule,
    sharedModule,
    DatepickerModule,
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
  ],
  bootstrap: [PurchaselistComponent],
})
export class PurchaselistModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
