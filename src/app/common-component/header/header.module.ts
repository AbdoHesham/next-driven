import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { User, Settings } from 'angular-feather/icons';
import { HeaderComponent } from './header.component';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
const icons = {
  User,
  Settings,
};

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    FeatherModule.pick(icons),
    BsDropdownModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  exports: [],
  providers: [BsDropdownConfig],
})
export class HeaderModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
