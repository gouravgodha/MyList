import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
{
	path: '',
	children: [
		{
			path: '',
			component:ViewComponent
		},
		{
			path: 'detail/:id',
			component:DetailComponent
		}
	]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShortlistRoutingModule { }
