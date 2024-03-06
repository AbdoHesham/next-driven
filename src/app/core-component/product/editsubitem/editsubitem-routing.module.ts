import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditsubitemComponent } from './editsubitem/editsubitem.component';

const routes: Routes = [{path:'',component:EditsubitemComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditsubitemRoutingModule { }
