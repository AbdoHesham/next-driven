import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditsubcategoryRoutingModule } from './editsubcategory-routing.module';
import { EditsubcategoryComponent } from './editsubcategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    EditsubcategoryComponent
  ],
  imports: [
    CommonModule,
    EditsubcategoryRoutingModule,
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
export class EditsubcategoryModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
