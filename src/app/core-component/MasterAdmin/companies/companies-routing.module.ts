import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { applicationRolesEnum } from 'src/@nextdriven/Enums/applicationRolesEnum';
import { AuthGuard } from 'src/@nextdriven/Services/auth.guard';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CreateEditCompanyComponent } from './create-edit-company/create-edit-company.component';

const routes: Routes = [
  {
    path: 'list',
    component: CompaniesListComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      title: 'Companies list',
      permissions: {
        only: JSON.parse(localStorage.getItem('Role') || '{}').includes(
          'MasterAdmin'
        ),
        redirectTo: '/errors/error-403',
      },
    },
  },
  {
    path: 'create',
    component: CreateEditCompanyComponent,
      canActivate: [AuthGuard, NgxPermissionsGuard],
      data: {
        title: 'Create Company',
        permissions: {
          only: JSON.parse(localStorage.getItem('Role') || '{}').includes(
            'MasterAdmin'
          ),
          redirectTo: '/errors/error-403',
        },
      },
  },
  {
    path: 'details/:id',
    component: CompanyDetailsComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      title: 'Company Details',
      permissions: {
        only: JSON.parse(localStorage.getItem('Role') || '{}').includes(
          'MasterAdmin'
        ),
        redirectTo: '/errors/error-403',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
