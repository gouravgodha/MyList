import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoCaptureComponent } from './video-capture/video-capture.component';

const routes: Routes = [
    {
        path: '',	
        children: [
            {
                path: '',   
                component: VideoCaptureComponent
            },            
            {
                path: 'video-capture',   
                component: VideoCaptureComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosignatureRoutingModule { }
