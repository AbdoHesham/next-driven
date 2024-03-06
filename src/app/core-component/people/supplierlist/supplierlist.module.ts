import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierlistRoutingModule } from './supplierlist-routing.module';
import { SupplierlistComponent } from './supplierlist.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
  
@NgModule({
  declarations: [SupplierlistComponent],
  imports: [CommonModule, SupplierlistRoutingModule, sharedModule,
    MatAutocompleteModule,
    FormsModule,
    sharedModule,
     ReactiveFormsModule,
     MatSelectModule,
     MatFormFieldModule,
     MatInputModule,
     NgxMatSelectSearchModule,
     TranslateModule.forChild({
       loader: {
         provide: TranslateLoader,
         useFactory: httpTranslateLoader,
         deps: [HttpClient]
       },
       isolate: false
     }),],
    })
export class SupplierlistModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}