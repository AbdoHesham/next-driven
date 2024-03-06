import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogicalGuard } from 'src/@nextdriven/Services/logical.guard';
import { ChangePasswordComponent } from './change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent,
    canActivate: [LogicalGuard],
    data: {
      title: 'change-password',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePasswordRoutingModule {}
