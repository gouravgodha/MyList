import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { CKEditorModule } from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { JobexpiredRoutingModule } from './jobexpired-routing.module';
import { RegisterjobComponent } from './registerjob/registerjob.component';
import { AddregisterjobComponent } from './addregisterjob/addregisterjob.component';
import { EditregisterjobComponent } from './editregisterjob/editregisterjob.component';


@NgModule({
 declarations: [RegisterjobComponent, AddregisterjobComponent, EditregisterjobComponent],
  imports: [
    CommonModule,
    JobexpiredRoutingModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class JobexpiredModule { }
