import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';


import { sharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { OpenRegisterComponent } from './open-register/open-register.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CloseRegisterComponent } from './close-register/close-register.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [PosComponent,OpenRegisterComponent, CloseRegisterComponent],
  imports: [CommonModule, PosRoutingModule, sharedModule,NgxScannerQrcodeModule,
    FormsModule,

    ReactiveFormsModule,
    MatDividerModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    MatDialogModule,
    NgIdleKeepaliveModule.forRoot() ,// use NgIdleModule.forRoot() if not using keepalive
    MatButtonToggleModule
  ],

})
export class PosModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
