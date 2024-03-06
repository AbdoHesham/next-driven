import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CountToModule } from 'angular-count-to';

import { FeatherModule } from 'angular-feather';
import { DataService } from '../core/core.index';
import { SpinnerInterceptor } from '../core/interceptor/spinner/spinner.interceptor';
import { MaterialModule } from './material/material.module';
import { FeatherIconModule } from './feather/feather.module';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CustomPaginationModule } from './custom-pagination/custom-pagination.module';
import { FullCalendarModule } from '@fullcalendar/angular';


import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
} from 'ngx-perfect-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgChartsModule } from 'ng2-charts';
import { NgxMaskModule } from 'ngx-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DeleteComponent } from './delete/delete.component';
import { InactiveAlertComponent } from './inactive-alert/inactive-alert.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { SetupOrgAlertComponent } from './setup-org-alert/setup-org-alert.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
@NgModule({
  declarations:[DeleteComponent,InactiveAlertComponent, EmptyStateComponent,SetupOrgAlertComponent]
  ,
  imports: [
    PerfectScrollbarModule,
    FeatherIconModule,
    MaterialModule,
    HttpClientModule,
    NgApexchartsModule,
    CountToModule,
    FormsModule,
    CarouselModule,
    CustomPaginationModule,
    DragDropModule,
    AngularEditorModule,
    NgxMaskModule.forRoot({
      showMaskTyped: false,
    }),
    NgChartsModule.forRoot(),
    FullCalendarModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
    MatDialogModule,

  ],
  exports: [
    FeatherModule,
    PerfectScrollbarModule,
    MaterialModule,
    HttpClientModule,
    FeatherIconModule,
    CountToModule,
    NgApexchartsModule,
    FormsModule,
    CarouselModule,
    CustomPaginationModule,
    DragDropModule,
    AngularEditorModule,
    NgChartsModule,
    FullCalendarModule,
    DeleteComponent,
    InactiveAlertComponent,
    EmptyStateComponent,
    SetupOrgAlertComponent
  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class sharedModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
