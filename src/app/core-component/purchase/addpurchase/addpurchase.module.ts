import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ng2-datepicker';
import { AddpurchaseRoutingModule } from './addpurchase-routing.module';
import { AddpurchaseComponent } from './addpurchase.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
@NgModule({
  declarations: [AddpurchaseComponent],
  imports: [
    CommonModule,
    AddpurchaseRoutingModule,
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
    NgxMatSelectSearchModule,

  ],
  bootstrap: [AddpurchaseComponent],
})
export class AddpurchaseModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

