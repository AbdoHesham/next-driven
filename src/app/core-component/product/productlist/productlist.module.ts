import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductlistRoutingModule } from './productlist-routing.module';
import { ProductlistComponent } from './productlist.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [ProductlistComponent],
  imports: [CommonModule, ProductlistRoutingModule, sharedModule,
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
    }),],
})
export class ProductlistModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

