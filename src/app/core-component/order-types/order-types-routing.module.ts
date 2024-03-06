import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/@nextdriven/Services/auth.guard';
import { ListComponent } from './list/list.component';
import { CreateEditComponent } from './create-edit/create-edit.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    canActivate: [
      AuthGuard,
    ],
    data: {
      title: 'list',
    },
  },
  {
    path: 'create/:id',
    component: CreateEditComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'list',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderTypesRoutingModule {}
