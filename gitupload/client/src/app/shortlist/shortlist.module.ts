import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortlistRoutingModule } from './shortlist-routing.module';
import { ViewComponent } from './view/view.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [ViewComponent, DetailComponent],
  imports: [
    CommonModule,
    ShortlistRoutingModule,
    ReactiveFormsModule
  ]
})
export class ShortlistModule { }
