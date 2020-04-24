import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">Attention</h4>            
        </div>
        <div class="modal-body">
            <p>{{messageContent}}!</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark btn-success" *ngIf="!disableClose" [disabled]="disableClose" (click)="activeModal.close('Close click')">Close</button>
            <button type="button" class="btn btn-outline-dark" *ngIf="disableClose" [disabled]="true">{{timeRemaining}}</button>
        </div>
    `
})
export class NgbdModalContent {
    
    @Input() messageContent;

    disableClose: Boolean = true;    
    timeRemaining: Number = 5;
    promptIntervalId: any;

    constructor(
        public activeModal: NgbActiveModal
    ) { 
        setTimeout((function(){
            this.disableClose = false;            
            clearInterval(this.promptIntervalId);
        }).bind(this),5000);

        this.promptIntervalId = setInterval((function(){
            this.timeRemaining -= 1;
        }).bind(this), 1000);
    }
}