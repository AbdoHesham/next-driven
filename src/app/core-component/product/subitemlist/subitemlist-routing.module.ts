import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubitemlistComponent } from './subitemlist/subitemlist.component';

const routes: Routes = [{path:'',component:SubitemlistComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubitemlistRoutingModule { }
