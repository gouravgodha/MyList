import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';

const routes: Routes =[
{
	path: '',
	// component: BusinessTypeComponent,
	children:[{
		path: '',   component: ViewuserComponent
	},
	{
		path: 'add',   component: AdduserComponent
	},{
		path: 'edit/:id',   component: EdituserComponent
	}]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
