import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditUsersComponent } from './create-edit-users/create-edit-users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from 'src/@nextdriven/Services/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: 'list',
    component: UsersListComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      title: 'Users list',
      permissions: {
        only: JSON.parse(localStorage.getItem('Role') || '{}').includes(
          'MasterAdmin'
        ),
        redirectTo: '/errors/error-403',
      },
    },
  },
  {
    path: 'create/:id',
    component: CreateEditUsersComponent,
      canActivate: [AuthGuard, NgxPermissionsGuard],
      data: {
        title: 'Create User',
        permissions: {
          only: JSON.parse(localStorage.getItem('Role') || '{}').includes(
            'MasterAdmin'
          ),
          redirectTo: '/errors/error-403',
        },
      },
  },
  {
    path: 'details',
    component: UserDetailsComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data: {
      title: 'User Details',
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
  exports: [RouterModule]
})
export class UsersRoutingModule { }
