import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { JobseekerRoutingModule } from './jobseeker-routing.module';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';

@NgModule({
  declarations: [JobseekerComponent, ViewemployeeComponent],
  imports: [
    CommonModule,
    JobseekerRoutingModule,
     ReactiveFormsModule
  ]
})
export class JobseekerModule { }
