import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import adapter from 'webrtc-adapter';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserTypeService } from "../../services/userService";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../../components/prompt/prompt.component'

import { qvgaConstraints, vgaConstraints, hdConstraints, fullHdConstraints, fourKConstraints, eightKConstraints, videoCheckBeforeUpload } from '../../CONSTANTS/video_quality_variations'

declare var window: any;

@Component({
    selector: 'app-video-capture',
    templateUrl: './video-capture.component.html',
    styleUrls: [
        './video-capture.component.scss'
    ],
    providers: [
        UserTypeService
    ]
})
export class VideoCaptureComponent implements OnInit, AfterViewInit {

    videoStream: any = null;
    echoCancellationEnabled: any = false;
    disableRecording: any = true;
    recordedBlobs: any = [];
    mediaRecorder: any;
    videoCountdownTimerId: any;

    elapsedDuration: Number = 0;
    maxVideoDuration: Number = 15;

    videoRecordingProgress: Number = 0;

    verificationPromptDisplayed: Boolean = false;

    recordingInProgress: Boolean = false;
    videoUploadingInProgress: Boolean = false;

    videoProgressBarWidth: Number = 0;
    videoProgressBarWidthStr: String = "0";
    
    playButtonDisabled = true;
    downloadButtonDisabled = true;

    recordButtonText: String = "Record";
    errorMessage: String = '';
    

    @ViewChild('video') video: HTMLVideoElement;
    @ViewChild('echoCancellation') echoCancellationCheckbox: HTMLInputElement;
    @ViewChild('recordVideo') recordVideoButton: HTMLInputElement;
    @ViewChild('videoStream') videoStreamDisplay;
    @ViewChild('recordedVideoStream') recordedVideoStreamDisplay;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private toastr: ToastrService,
        private userService: UserTypeService,
        private modalService: NgbModal
    ) {

    }

    ngOnInit() {
        this.checkMediaStatus();
        fetch('https://reddit.com/r/programming.json',{mode: 'no-cors'})
            .then(response => console.log("Response is ", response.body))
            .catch(error => console.log("Error caught ", error))
    }

    ngAfterViewInit() {
        this.videoStreamDisplay.nativeElement.muted = true;
        console.log("videoStreamDisplay", this.videoStreamDisplay);        
        // console.log("recordedVideoStreamDisplay", this.recordedVideoStreamDisplay);        
    }

    openModal() {
        const modalRef = this.modalService.open(NgbdModalContent,{ backdrop: 'static'});
        console.log("videoCheckBeforeUpload message", videoCheckBeforeUpload);
        modalRef.componentInstance.messageContent = videoCheckBeforeUpload;
    }

    hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
        
    videoPlaybackEnd() {
        console.log("Video playback ended.");
    }

    checkMediaStatus(){

        console.log("Media status being checked");
        console.log("mediaCapabilities", navigator.mediaDevices.getUserMedia);

        var types = [
            "video/mp4", 
            "audio/mp4", 
            "video/webm", 
            "audio/webm", 
            "video/webm\;codecs=vp8", 
            "video/webm\;codecs=daala", 
            "video/webm\;codecs=h264", 
            "audio/webm\;codecs=opus", 
            "video/mpeg"
        ];

        for (var i in types) { 
            console.log( "Is " + types[i] + " supported? " + (window.MediaRecorder.isTypeSupported(types[i]) ? "Maybe!" : "Nope :(")); 
        }
        
        if (this.hasGetUserMedia()) {
            console.log("User media available!");
            this.getMediaDevices();
        } else {
            alert('getUserMedia() is not supported by your browser');
        }
    };

    echoCancellationStatusChange(e) {
        console.log("Event fired", e);
        this.echoCancellationEnabled = e.target.checked;
        console.log("this.echoCancellationEnabled", this.echoCancellationEnabled);
    }

    handleRecordingTime() {
        try{
            if(this.videoCountdownTimerId){
                clearInterval(this.videoCountdownTimerId);
            }
        }
        catch(exception){
            console.log("Exception caught", exception);
        }

        this.videoCountdownTimerId = setInterval((function() {
            if(this.elapsedDuration < this.maxVideoDuration) {
                this.elapsedDuration += 1;
                console.log("Width is now", this.videoProgressBarWidth);
                this.videoProgressBarWidth += 100/this.maxVideoDuration;
                this.videoRecordingProgress = Math.floor(this.videoProgressBarWidth);
                this.videoProgressBarWidthStr = this.videoProgressBarWidth + '%';
            } else {
                this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> Maximum time limit reached for recording the video. Please upload the video or try again.', '', {
                    timeOut: 5000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-info alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.stopRecording();
                clearInterval(this.videoCountdownTimerId);
            }
        }).bind(this),1000)
    }

    async init(constraints) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log("typeof stream", typeof(stream))
            this.handleSuccess(stream);
        } catch (e) {
            console.error('navigator.getUserMedia error:', e);
            // errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
            this.errorMessage = `navigator.getUserMedia error:${e.toString()}`;            
        }
    }

    async startCamera() {
        console.log("Checkbox", this.echoCancellationCheckbox);        
        const hasEchoCancellation = this.echoCancellationEnabled;
        const constraints = {
            audio: {
                echoCancellation: {
                    exact: hasEchoCancellation
                }
            },
            video: {
                width: 1280, 
                height: 720
            }
        };
        console.log('Using media constraints:', constraints);
        await this.init(constraints);
    }
    
    handleDataAvailable(event) {
        // console.log("The event data is", event);
        if (event.data && event.data.size > 0) {
            this.recordedBlobs.push(event.data);
        }
    }    

    startRecording() {

        if (this.recordButtonText === 'Stop') {
            this.stopRecording();
            
            return;
        }

        this.recordedBlobs = [];        

        let options = {
            audioBitsPerSecond : 128000,
            videoBitsPerSecond : 2500000,
            mimeType: 'video/mp4'
        };

        if (!window.MediaRecorder.isTypeSupported(options.mimeType)) {

            console.error(`${options.mimeType} is not Supported`);            
            // errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
            this.errorMessage = `${options.mimeType} is not Supported`;

            options = {
                ...options,
                mimeType: 'video/webm;codecs=vp9'
            };

            if (!window.MediaRecorder.isTypeSupported(options.mimeType)) {

                console.error(`${options.mimeType} is not Supported`);            
                // errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
                this.errorMessage = `${options.mimeType} is not Supported`;
                
                options = {
                    ...options,
                    mimeType: 'video/webm;codecs=vp8'
                };
                
                if (!window.MediaRecorder.isTypeSupported(options.mimeType)) {

                    console.error(`${options.mimeType} is not Supported`);                
                    // errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;                
                    this.errorMessage = `${options.mimeType} is not Supported`;
                    
                    options = {
                        ...options,
                        mimeType: 'video/webm'
                    };
                    
                    if (!window.MediaRecorder.isTypeSupported(options.mimeType)) {
                        
                        console.error(`${options.mimeType} is not Supported`);
                        // errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;                    
                        this.errorMessage= `${options.mimeType} is not Supported`;
                        
                        options = {
                            ...options,
                            mimeType: ''
                        };
                    }
                }
            }
        }
      
        try {
            this.mediaRecorder = new window.MediaRecorder(window.stream, options);
        } catch (e) {
            console.error('Exception while creating MediaRecorder:', e);
            // errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
            this.errorMessage = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
            return;
        }
      
        console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
        
        // recordButton.textContent = 'Stop Recording';
        this.recordButtonText = 'Stop';

        // playButton.disabled = true;
        this.playButtonDisabled = true;

        // downloadButton.disabled = true;
        this.downloadButtonDisabled = true;

        this.mediaRecorder.onstop = (event) => {
            console.log('Recorder stopped: ', event);
        };
        this.mediaRecorder.ondataavailable = (this.handleDataAvailable).bind(this);
        this.mediaRecorder.start(10); // collect 10ms of data
        (this.handleRecordingTime).bind(this);
        this.handleRecordingTime();
        this.recordingInProgress = true;
        console.log('MediaRecorder started', this.mediaRecorder);
    }
    
    stopRecording() {
        this.elapsedDuration = 0;
        this.videoProgressBarWidth = 0;
        this.videoProgressBarWidthStr = "0px";

        this.recordButtonText = 'Record';
        this.playButtonDisabled = false;
        this.downloadButtonDisabled = false;        
        this.recordingInProgress = false;
        
        this.mediaRecorder.stop();
        clearInterval(this.videoCountdownTimerId);
        console.log('Recorded Blobs: ', this.recordedBlobs);
    }
      
    handleSuccess(stream) {
        this.disableRecording = false;
        console.log('getUserMedia() got stream:', stream);
        window.stream = stream;
              
        // let videoStreamDisplay: any = document.getElementById("videoStream");
        // console.log("videoStreamDisplay", videoStreamDisplay);
    
        // videoStreamDisplay.srcObject = stream;
        this.videoStreamDisplay.nativeElement.srcObject = stream;
    }    

    downloadVideo() {        
        const blob = new Blob(this.recordedBlobs, {
            type: 'video/webm'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'test.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    playRecordedVideo() {
        const superBuffer = new Blob(this.recordedBlobs, {
            type: 'video/webm'
        });
        console.log("this.recordedVideoStreamDisplay", this.recordedVideoStreamDisplay);
        this.recordedVideoStreamDisplay.nativeElement.src = null;
        this.recordedVideoStreamDisplay.nativeElement.srcObject = null;
        this.recordedVideoStreamDisplay.nativeElement.src = window.URL.createObjectURL(superBuffer);
        this.recordedVideoStreamDisplay.nativeElement.controls = true;
        this.recordedVideoStreamDisplay.nativeElement.play();
    }

    getMediaDevices(){
        navigator.mediaDevices.enumerateDevices().then(devices => {
            console.log("The available devices are", devices);
        })        
    }

    uploadVideo() {        

        console.log("this.recordedBlobs", this.recordedBlobs);
        if(!this.recordedBlobs.length){
            console.log("this.recordedBlobs", this.recordedBlobs);
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> The Video was already uploaded.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
            return;
        }

        if(!this.verificationPromptDisplayed){
            this.verificationPromptDisplayed = true;
            this.openModal();
            return;
        }
        
        this.videoUploadingInProgress = true;

        const video = new Blob(this.recordedBlobs, {
            type: 'video/webm'
        });

        let data = new FormData();
        data.append('video', video);

        this.userService.uploadVideo(data).subscribe(res => {
            console.log("Response received from userService.uploadVideo method", res);            
            if (res.status == 200) {
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Video uploaded Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });         
                this.recordedBlobs.length = 0;
                this.videoUploadingInProgress = false;
            } else {
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Video upload failed, please try again.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.videoUploadingInProgress = false;
            }
        }, err => {
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Video upload failed, please try again.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center' 
            });
            this.videoUploadingInProgress = false;
        });
    }    
}
