import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/core.index';
import { CoreComponentComponent } from './core-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: CoreComponentComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'components',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'blank-page',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./blank-page/blank-page.module').then(
            (m) => m.BlankPageModule
          ),
      },
      {
        path: 'product',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'sales',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./sales/sales.module').then((m) => m.SalesModule),
      },

      {
        path: 'transfer',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./transfer/transfer.module').then((m) => m.TransferModule),
      },
      {
        path: 'return',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./return/return.module').then((m) => m.ReturnModule),
      },
      {
        path: 'people',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./people/people.module').then((m) => m.PeopleModule),
      },
      {
        path: 'places',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./places/places.module').then((m) => m.PlacesModule),
      },

      {
        path: 'element',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./element/element.module').then((m) => m.ElementModule),
      },
      {
        path: 'charts',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./charts/charts.module').then((m) => m.ChartsModule),
      },
      {
        path: 'icons',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'forms',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./forms/forms.module').then((m) => m.FormsModule),
      },
      {
        path: 'table',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'application',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./application/application.module').then(
            (m) => m.ApplicationModule
          ),
      },
      {
        path: 'report',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
      },
      {
        path: 'users',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'activities',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./activities/activities.module').then(
            (m) => m.ActivitiesModule
          ),
      },
      // {
      //   path: 'orders',
      //   canActivate: [AuthGuard],
      //   loadChildren: () =>
      //   import('./orders/orders.module').then(
      //     (m) =>m.OrdersModule
      //   )
         
      // },
      {
        path: 'purchase',
        canActivate: [AuthGuard],
    
        loadChildren: () =>
          import('./purchase/purchase.module').then((m) => m.PurchaseModule),
      },
      {
        path: 'expense',
        canActivate: [AuthGuard],
    
        loadChildren: () =>
          import('./expense/expense.module').then((m) => m.ExpenseModule),
      },
      {
        path: 'quotation',
        canActivate: [AuthGuard],
    
        loadChildren: () =>
          import('./quotation/quotation.module').then((m) => m.QuotationModule),
      },
      {
        path: 'assigned-company',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './Mycompany/assigned-company/assigned-company.module'
          ).then((m) => m.AssignedCompanyModule),
      },
      {
        path: 'authorities-and-privileges',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './authorities-and-privileges/authorities-and-privileges.module'
          ).then((m) => m.AuthoritiesAndPrivilegesModule),
      },
      {
        path: 'order-types',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./order-types/order-types.module').then(
            (m) => m.OrderTypesModule
          ),
      },
      {
        path: 'master-admin',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./MasterAdmin/master-addmin.module').then(
            (m) => m.MasterAddminModule
          ),
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreComponentRoutingModule {}
