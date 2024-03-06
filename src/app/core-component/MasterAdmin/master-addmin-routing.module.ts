import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/core.index';

const routes: Routes = [
  {
    path: 'organization',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./organization/organization.module').then(
        (m) => m.OrganizationModule
      ),
  },
  {
    path: 'companies',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./companies/companies.module').then((m) => m.CompaniesModule),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterAddminRoutingModule { }
