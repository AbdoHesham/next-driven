import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UomlistComponent } from './uomlist.component';

const routes: Routes = [{ path: '', component:UomlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UomlistRoutingModule { }
