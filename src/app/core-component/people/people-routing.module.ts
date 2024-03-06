import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './people.component';

const routes: Routes = [
  { path: '', redirectTo: 'customerlist', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'customer-list',
        loadChildren: () =>
          import('./customerlist/customerlist.module').then(
            (m) => m.CustomerlistModule
          ),
      },
      {
        path: 'add-customer/:id',
        loadChildren: () =>
          import('./addcustomer/addcustomer.module').then(
            (m) => m.AddcustomerModule
          ),
      },
      {
        path: 'supplier-list',
        loadChildren: () =>
          import('./supplierlist/supplierlist.module').then(
            (m) => m.SupplierlistModule
          ),
      },
      {
        path: 'add-supplier/:id',
        loadChildren: () =>
          import('./addsupplier/addsupplier.module').then(
            (m) => m.AddsupplierModule
          ),
      },

      {
        path: 'store-list',
        loadChildren: () =>
          import('./storelist/storelist.module').then((m) => m.StorelistModule),
      },
      {
        path: 'add-store/:id',
        loadChildren: () =>
          import('./addstore/addstore.module').then((m) => m.AddstoreModule),
      },


      {
        path: 'edit-store',
        loadChildren: () =>
          import('./editstore/editstore.module').then((m) => m.EditstoreModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
