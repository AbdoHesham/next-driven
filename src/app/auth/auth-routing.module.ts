import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { OTPFormComponent } from './otp-form/otp-form.component';
import { FirstLoginGuard } from 'src/@nextdriven/Services/first-login.guard';
import { applicationRolesEnum } from 'src/@nextdriven/Enums/applicationRolesEnum';
import { LicenseFormComponent } from './license-form/license-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./signin/signin.module').then((m) => m.SigninModule),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./change-password/change-password.module').then((m) => m.ChangePasswordModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./signup/signup.module').then((m) => m.SignupModule),
      },
      {
        path: 'forgetpassword',
        loadChildren: () =>
          import('./forgetpassword/forgetpassword.module').then(
            (m) => m.ForgetpasswordModule
          ),
      },
      {
        path: 'otp',
        loadChildren: () =>
          import('./otp-form/otp-form.module').then(
            (m) => m.OtpFormModule
          ),
      },
      {
        path: 'license',
        loadChildren: () =>
          import('./license-form/license-form.module').then(
            (m) => m.LicenseFormModule
          ),
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
