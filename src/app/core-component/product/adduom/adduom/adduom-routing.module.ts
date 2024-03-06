import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdduomComponent } from './adduom/adduom.component';

const routes: Routes = [{ path: '', component:AdduomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdduomRoutingModule { }
