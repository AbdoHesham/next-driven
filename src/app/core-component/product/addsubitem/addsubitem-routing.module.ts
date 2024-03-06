import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsubitemComponent } from './addsubitem/addsubitem.component';

const routes: Routes = [{ path: '', component: AddsubitemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddsubitemRoutingModule { }
