import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JobapplyRoutingModule } from './jobapply-routing.module';
import { ViewComponent } from './view/view.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [ViewComponent, DetailComponent],
  imports: [
    CommonModule,
    JobapplyRoutingModule,
    ReactiveFormsModule
  ]
})
export class JobapplyModule { }
