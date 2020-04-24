import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { CKEditorModule } from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { JobregisterRoutingModule } from './jobregister-routing.module';
import { RegisterjobComponent } from './registerjob/registerjob.component';
import { AddregisterjobComponent } from './addregisterjob/addregisterjob.component';
import { EditregisterjobComponent } from './editregisterjob/editregisterjob.component';
import { DraftjobComponent } from './draftjob/draftjob.component';

@NgModule({
  declarations: [RegisterjobComponent, AddregisterjobComponent, EditregisterjobComponent, DraftjobComponent],
  imports: [
    CommonModule,
    JobregisterRoutingModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class JobregisterModule { }
