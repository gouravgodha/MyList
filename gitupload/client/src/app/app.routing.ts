import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/authGuard.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CustomerPolicyInfoComponent } from './customerinfo/customer-policy-info/customer-policy-info.component';
import { HomeComponent } from './mylist/home/home.component';
// import { BusinessTypeComponent } from './businesstypemodule/business-type/business-type.component';
import { BlankComponent } from './blank/blank.component';
const routes: Routes =[
  
   {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      canActivate:[AuthGuard]
  },{
     path: '',
     redirectTo: 'businesstype',
     pathMatch: 'full',
  },]},   
 
{
    path: '',
    component: BlankComponent,
    children: [
        {
            path: 'auth',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        }
    ]
},
{
path: 'customerinfo/:customer_id',
component: CustomerPolicyInfoComponent,
 children: [
        {
            path: '',
            loadChildren: './customerinfo/customerinfo.module#CustomerinfoModule'
        }
    ]
},
{
path: 'mylist',
component: BlankComponent,
 children: [
        {
            path: '',
            loadChildren: './mylist/mylist.module#MylistModule'
           // canActivate:[AuthGuard]
        }
    ]
},
 {
    path: '**',
    redirectTo: 'businesstype'
  } 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
