import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewcompanyComponent } from './viewcompany/viewcompany.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { EditcompanyComponent } from './editcompany/editcompany.component';
// import { UpdatefromtypeComponent } from './updatefromtype/updatefromtype.component';

const routes: Routes =[
{
	path: '',
	// component: BusinessTypeComponent,
	children:[{
		path: '',   component: ViewcompanyComponent
	},
	{
		path: 'add',   component: AddcompanyComponent
	},{
		path: 'edit/:id',   component: EditcompanyComponent
	}]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
