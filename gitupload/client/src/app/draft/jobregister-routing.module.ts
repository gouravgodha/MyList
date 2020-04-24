import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraftjobComponent } from './registerjob/draftjob.component';
// import { DraftjobComponent } from './draftjob/draftjob.component';
import { AddregisterjobComponent } from './addregisterjob/addregisterjob.component';
import { EditregisterjobComponent } from './editregisterjob/editregisterjob.component';

const routes: Routes = [
{
		path: '',
		children:[
			{
				path: '',
				component: DraftjobComponent
			},
			// {
			// 	path: 'draft',
			// 	component: DraftjobComponent
			// },
			// {
			// 	path: 'view/:emp_id',
			// 	component:ViewemployeeComponent
			// },
			{
				path: 'add',
				component: AddregisterjobComponent
			},
			{
				path: 'edit/:id',
				component: EditregisterjobComponent
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobregisterRoutingModule { }
