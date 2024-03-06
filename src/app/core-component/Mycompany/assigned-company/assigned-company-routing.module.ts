import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/@nextdriven/Services/auth.guard';
import { InformationComponent } from './information/information.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { EditSettingComponent } from './edit-setting/edit-setting.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'companyinformation',
    component:InformationComponent,
    canActivate: [AuthGuard,
      
      // NgxPermissionsGuard
    
    ],
    
  },
  {
    path: 'setting',
    component:SettingsComponent,
    canActivate: [AuthGuard,
      
      // NgxPermissionsGuard
    
    ],
    
  },
  {
  path: 'edit',
    component:EditCompanyComponent,
    canActivate: [AuthGuard,
      
      // NgxPermissionsGuard
    
    ],
   
    
    
    
  },
  
    {
      path: 'editSetting',
        component:EditSettingComponent,
        canActivate: [AuthGuard,
      
          // NgxPermissionsGuard
        
        ],
       
      },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignedCompanyRoutingModule { }
