import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';

const routes: Routes = [
	{
		path: '',
		children:[
			{
				path: '',
				component: JobseekerComponent
			},
			{
				path: 'view/:emp_id',
				component:ViewemployeeComponent
			}
			// {
			// 	path: 'add',
			// 	component: AddCustomerComponent
			// },
			// {
			// 	path: 'edit/:customer_id',
			// 	component: EditCustomerComponent
			// }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobseekerRoutingModule { }
