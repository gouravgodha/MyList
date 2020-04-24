import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerPolicyInfoComponent } from './customer-policy-info/customer-policy-info.component';

const routes: Routes = [
// {
// 		path: '',
// 		children:[
// 			{
// 				path: 'add',
// 				component: CustomerPolicyInfoComponent
// 			},
// 			{
// 				path:'id/:customer_id',
// 				component:CustomerPolicyInfoComponent
// 			}			
// 		]
// 	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerinfoRoutingModule { }
