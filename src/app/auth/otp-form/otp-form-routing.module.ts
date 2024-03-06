import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OTPFormComponent } from './otp-form.component';
import { FirstLoginGuard } from 'src/@nextdriven/Services/first-login.guard';
import { applicationRolesEnum } from 'src/@nextdriven/Enums/applicationRolesEnum';

const routes: Routes = [
{
  path: '',
  component: OTPFormComponent,
  canActivate: [ FirstLoginGuard ],
  data: {
    title: 'otp',
    // applicationRolesEnum.MasterAdmin
    permissions: {
      only: [applicationRolesEnum.MasterAdmin],
      redirectTo: '/errors/error-403',
    },
  },
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtpFormRoutingModule { }
