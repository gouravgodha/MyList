import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessTypeComponent } from './business-type/business-type.component';
import { BusinessTypeAddComponent } from './business-type-add/business-type-add.component';
import { BusinessTypeUpdateComponent } from './business-type-update/business-type-update.component';


const routes: Routes = [
{
	path: '',
	// component: BusinessTypeComponent,
	children:[{
		path: '',   component: BusinessTypeComponent
	},
	{
		path: 'add',   component: BusinessTypeAddComponent
	},{
		path: 'edit/:id',   component: BusinessTypeUpdateComponent
	}]
}
// ,{
// 	path: '',   component: BusinessTypeAddComponent,
// 	children:[{
// 		path: 'add',   component: BusinessTypeAddComponent,

// 	},{
// 		path: 'edit',   component: BusinessTypeAddComponent,
		
// 	}]
// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesstypemoduleRoutingModule { }
