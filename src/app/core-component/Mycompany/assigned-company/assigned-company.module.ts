import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignedCompanyRoutingModule } from './assigned-company-routing.module';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { EditSettingComponent } from './edit-setting/edit-setting.component';
import { InformationComponent } from './information/information.component';
import { SettingsComponent } from './settings/settings.component';

import { DatepickerModule } from 'ng2-datepicker';

import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    EditCompanyComponent,
    EditSettingComponent,
    InformationComponent,
    SettingsComponent,
  ]
  ,
    
  imports: [
    CommonModule,
    AssignedCompanyRoutingModule,
    sharedModule,
    DatepickerModule,
    sharedModule,
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
     }),],
 bootstrap: [],
  
})
export class AssignedCompanyModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
