import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JobboardSectionRoutingModule } from './jobboard-section-routing.module';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ViewComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    JobboardSectionRoutingModule,
     ReactiveFormsModule
  ]
})
export class JobboardSectionModule { }
