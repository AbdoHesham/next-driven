import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { CreateEditUsersComponent } from './create-edit-users/create-edit-users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';

import { NgxMaskModule } from 'ngx-mask';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { ApplicationPipesModule } from 'src/@nextdriven/Pipes/application-pipes.module';
import { sharedModule } from '../../../shared/shared.module';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateSeplingCompanyComponent } from './create-sepling-company/create-sepling-company.component';
import { EditAssignedCompanyComponent } from './edit-assigned-company/edit-assigned-company.component';
// import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NgxPermissionsModule } from 'ngx-permissions';
// import { NbCardModule, NbStatusService, NbStepperModule } from '@nebular/theme';


@NgModule({
  declarations: [
    CreateEditUsersComponent,
    UsersListComponent,
    UserDetailsComponent,
    UpdateUserComponent,
    CreateSeplingCompanyComponent,
    EditAssignedCompanyComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule,
    FormsModule,
    sharedModule,

    ReactiveFormsModule,
    ApplicationPipesModule,
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
    // NzStepsModule,
    // NbStepperModule,
    // NbCardModule, 
    NgxMaskModule.forRoot(),
    NgxMatSelectSearchModule,
    MatIconModule,
    MatAutocompleteModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    MatSlideToggleModule,
    MatStepperModule,
    NgxPermissionsModule.forChild(),

  ],
  // providers:[NbStatusService]
})
export class UsersModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
