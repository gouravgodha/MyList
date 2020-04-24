import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeapiComponent } from './homeapi/homeapi.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployersComponent } from './employers/employers.component';
import { EmployeeComponent } from './employee/employee.component';
import { SearchjobComponent } from './searchjob/searchjob.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { JobapplyComponent } from './jobapply/jobapply.component';
import { CompanyjobComponent } from './companyjob/companyjob.component';
import { AuthGuardWebService as AuthGuardWeb } from '../services/authGuardweb.service';
const routes: Routes = [
	{
		path: '',
		children:[
			{
				path: '',
				component: HomeComponent
			},
			{
				path: 'landing',
				component: HomeapiComponent
			},
			{
				path: 'dashboard',
				component: DashboardComponent,
				canActivate:[AuthGuardWeb]
			},
			{
				path: 'jobapply',
				component: JobapplyComponent,
				canActivate:[AuthGuardWeb]
			},
			{
				path: 'employers',
				component: EmployersComponent
			},
			{
				path: 'employee',
				component: EmployeeComponent
			},
			{
				path: 'searchjob',
				component: SearchjobComponent
			},
			
			{
				path: 'jobdetail/:id',
				component: JobdetailComponent
			},
			{
				path: 'companyjob/:company_id',
				component: CompanyjobComponent
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
export class MylistRoutingModule { }
