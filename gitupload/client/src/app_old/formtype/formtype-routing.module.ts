import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormtypecomponentComponent } from './formtypecomponent/formtypecomponent.component';
import { AddformtypecomponentComponent } from './addformtypecomponent/addformtypecomponent.component';
import { UpdatefromtypeComponent } from './updatefromtype/updatefromtype.component';


const routes: Routes = [
{
	path: '',
	// component: BusinessTypeComponent,
	children:[{
		path: '',   component: FormtypecomponentComponent
	},
	{
		path: 'add',   component: AddformtypecomponentComponent
	},{
		path: 'edit/:id',   component: UpdatefromtypeComponent
	}]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormtypeRoutingModule { }
