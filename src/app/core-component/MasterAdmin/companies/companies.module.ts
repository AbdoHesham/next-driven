import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CreateEditCompanyComponent } from './create-edit-company/create-edit-company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ApplicationPipesModule } from 'src/@nextdriven/Pipes/application-pipes.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { EditAssignedManagerComponent } from './edit-assigned-manager/edit-assigned-manager.component';
import { EditLicenseDateComponent } from './edit-license-date/edit-license-date.component';
import { sharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CompaniesListComponent,
    CreateEditCompanyComponent,
    CompanyDetailsComponent,
    EditAssignedManagerComponent,
    EditLicenseDateComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    RouterModule,
    sharedModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationPipesModule ,
    //Components
    // Angular Material Design 
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatRadioModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MatSidenavModule,
    MatDialogModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
    NgxMatSelectSearchModule,
    MatIconModule,
    MatAutocompleteModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
    MatSlideToggleModule,
    MatStepperModule
  ]
})
export class CompaniesModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


