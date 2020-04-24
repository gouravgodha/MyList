import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUserRoleComponent } from './view-user-role/viewUserRole.component';
import { AddUserRoleComponent } from './add-user-role/addUserRole.component';
import { EditUserRoleComponent } from './edit-user-role/editUserRole.component';

const routes: Routes =[
	{
		path: '',	
		children: [
			{
				path: '',   
				component: ViewUserRoleComponent
			},
			{
				path: 'add',   
				component: AddUserRoleComponent
			},
			{
				path: 'edit/:id',   
				component: EditUserRoleComponent
			}
		]
	}
];

@NgModule({
  	imports: [RouterModule.forChild(routes)],
  	exports: [RouterModule]
})

export class UserRoleRoutingModule {}