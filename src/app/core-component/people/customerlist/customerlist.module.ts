import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerlistRoutingModule } from './customerlist-routing.module';
import { CustomerlistComponent } from './customerlist.component';

import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CustomerlistComponent],
  imports: [
    CommonModule,
    CustomerlistRoutingModule,
    sharedModule,
    FormsModule,

    ReactiveFormsModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
})
export class CustomerlistModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
