import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/@nextdriven/Services/auth.guard';
import { CreateEditAuthoritiesAndPrivilegesComponent } from './create-edit-authorities-and-privileges/create-edit-authorities-and-privileges.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'list',
    component:ListComponent,
    canActivate: [AuthGuard,
      
      // NgxPermissionsGuard
    
    ],
    // data: {
    //   title: 'create organization',
    //   permissions: {
    //     only: ['Manager'],
    //     redirectTo: '/errors/error-403',
    //   },
    // },
  },
  {
    path: 'create/:id',
    component:CreateEditAuthoritiesAndPrivilegesComponent,
    canActivate: [AuthGuard,
      
      // NgxPermissionsGuard
    
    ],
    // data: {
    //   title: 'create organization',
    //   permissions: {
    //     only: ['Manager'],
    //     redirectTo: '/errors/error-403',
    //   },
    // },
  },
  {
    path: 'list',
    component:ListComponent,
    canActivate: [AuthGuard,
      
      // NgxPermissionsGuard
    
    ],
    // data: {
    //   title: 'create organization',
    //   permissions: {
    //     only: ['Manager'],
    //     redirectTo: '/errors/error-403',
    //   },
    // },
  },
  {
    path: 'viewDetails',
    component:DetailsComponent,
    canActivate: [AuthGuard,
      
      // NgxPermissionsGuard
    
    ],
    // data: {
    //   title: 'create organization',
    //   permissions: {
    //     only: ['Manager'],
    //     redirectTo: '/errors/error-403',
    //   },
    // },
  },
  
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthoritiesAndPrivilegesRoutingModule { }
