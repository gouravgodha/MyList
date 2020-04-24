import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
{
		path: '',
		children:[
			{
				path: '',
				component: ViewComponent
			},
			{
				path: 'add',
				component: AddComponent
			},
			{
				path: 'edit/:id',
				component: EditComponent
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobboardSectionRoutingModule { }
