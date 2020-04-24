import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosignatureRoutingModule } from './videosignature-routing.module';
import { VideoCaptureComponent } from './video-capture/video-capture.component';

@NgModule({
  declarations: [
  	VideoCaptureComponent
  ],
  exports:[VideoCaptureComponent],
  imports: [
    CommonModule,
    VideosignatureRoutingModule
  ]
})
export class VideosignatureModule { }
