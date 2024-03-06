import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/@nextdriven/Services/auth.guard';
import { POSGuard } from 'src/@nextdriven/Services/pos.guard';
import { POSLoginComponent } from './pos-login/pos-login.component';
import { POSPinCodeComponent } from './pos-pin-code/pos-pin-code.component';

const routes: Routes = [
  { path: '', redirectTo: '/sales/pos/auth/login', pathMatch: 'full' },
  // this.router.navigate(['sales/pos/auth/login']);

  {
    path: 'login',
    component: POSLoginComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'POS',
      // applicationRolesEnum.MasterAdmin
      permissions: {
        only: [],
        redirectTo: '/errors/error-403',
      },
    }, 
  },
  {
    path: 'pin-code',
    component: POSPinCodeComponent,
    canActivate: [POSGuard],
    data: {
      title: 'Pin Code',
      // 
      permissions: {
        only: [],
        redirectTo: '/errors/error-403',
      },
    },
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
