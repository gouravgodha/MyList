import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { JobApplyService } from "../../services/jobapplyService";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
   providers: [
        JobApplyService
    ]
})
export class DetailComponent implements OnInit {
 	
 	registered_job = {};
    registeredEditForm : FormGroup;  
    id: any;
    constructor(
        private sanitizer:DomSanitizer,
  	    private jobApplyService: JobApplyService,  	   
        private router: Router,        
        private route: ActivatedRoute,
         
    ) { }
    

    ngOnInit() {
    	this.route.params.subscribe(params => {
    		this.getJobApplyDetail(params['id']);
    		this.id = params['id'];
    	})
    }

    downloadp(resume){

    	  window.open(`http://localhost:8217/documents/${resume}`, '_blank');
    }
  
    getJobApplyDetail(id){
        this.jobApplyService.getJobApplyListById(id).subscribe(res => {
                console.log("Response received from  service.", res);
                if (res.status == 200) {
                    console.log("Response is", res);
                    this.registered_job = res.data;
                     //this.registeredEditForm.controls["job_title"].setValue(this.registered_job.job_register.job_title);
                } 
                else {
                 alert("There is some error, please check");
                }
            }, err => {
                console.log("An error occured", err);  
                
        });
    }

}
