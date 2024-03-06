import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Layers } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';
import { LoaderComponent } from './common-component/loader/loader.component';
import { sharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderModule } from './common-component/header/header.module';
import { CoreComponentModule } from './core-component/core-component.module';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


const icons = {
  Layers,
};

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    CommonModule,
    CoreComponentModule,
    sharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    BsDropdownModule,
    NgxPermissionsModule.forRoot(),
    NgxMatSelectSearchModule,

  ],
  exports: [FeatherModule],
  bootstrap: [AppComponent],
  providers: [BsDropdownConfig],

})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
