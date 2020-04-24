import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { JobBoardService } from "../../services/jobboardService";
import { DataService } from "../../services/data.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
   providers: [
        JobBoardService      
    ]
})
export class AddComponent implements OnInit {

    customerCreationForm : FormGroup;
    formTypeList: any = [];
    selectedDocument: any;

    constructor(
  	    private jobBoardService: JobBoardService,  	  
        private DataService: DataService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router:Router
    ) { }
        users:any;

  ngOnInit() {
      this.DataService.getUserState().subscribe(data=>{
       this.users=data;
       }) 
      if(localStorage.getItem('users')!=null && localStorage.getItem('users')!=undefined)
      {
       this.users=JSON.parse(localStorage.getItem('users')); 
      };
        this.initForm();      
    }  

    initForm() {
        this.customerCreationForm = this.formBuilder.group({
            title: ["", Validators.required],
            // customer_user_id: ["", Validators.required],
            description: ["", Validators.required],
            image: ["", Validators.required],
            button_name: ["", Validators.required],
            status: ["", Validators.required]
        });       
    }

    

   SelectedFile: any;
  OnFileChange(event) {
    console.log("event value is",event);
    if (event.target.files.length > 0) {
      this.SelectedFile = event.target.files[0];
      console.log("ONchange file log =>>",this.SelectedFile);
    }
  }

    addCJobBoard() {
        console.log("Add JobBoard called.");

        let jobboardsection = new FormData();

        jobboardsection.append('title', this.customerCreationForm.controls["title"].value);
        jobboardsection.append('description', this.customerCreationForm.controls["description"].value);
        jobboardsection.append('image', this.SelectedFile);
        jobboardsection.append('button_name', this.customerCreationForm.controls["button_name"].value);
        jobboardsection.append('status', this.customerCreationForm.controls["status"].value);
       	        
        this.jobBoardService.addJobBoardSection(jobboardsection).subscribe(res => {
            console.log("Response received from the  service Method", res);
            if (res.status == 200) {                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Record Added Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.router.navigate(['/job-board']);
            } else {
                console.log("Error is =>",res.data.errors[0].message);
                var error_constraint = res.data.errors[0].message;
                
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>'+error_constraint, '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {          
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Record Creation failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });

        });
    } 

    
   
}
