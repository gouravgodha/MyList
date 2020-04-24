import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const routes: Routes =[
	{
		path: '',
		children:[
			{
				path: '',
				component: ViewCustomerComponent
			},
			{
				path: 'add',
				component: AddCustomerComponent
			},
			{
				path: 'edit/:customer_id',
				component: EditCustomerComponent
			}
		]
	}
];

@NgModule({
  	imports: [RouterModule.forChild(routes)],
  	exports: [RouterModule]
})

export class CustomerRoutingModule{}