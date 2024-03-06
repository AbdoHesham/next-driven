import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from 'src/@nextdriven/Services/auth.guard';
import { CreateEditOrganizationComponent } from './create-edit-organization/create-edit-organization.component';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationDetailsComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      title: 'organization',
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
    component: CreateEditOrganizationComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      title: 'create organization',
      permissions: {
        only: JSON.parse(localStorage.getItem('Role') || '{}').includes(
          'MasterAdmin'
        ),
        redirectTo: '/errors/error-403',
      },
    },
  },
  // {path:'details',component:OrganizationDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
