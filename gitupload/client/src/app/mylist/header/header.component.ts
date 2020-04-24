import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { JobRegisterService } from "../../services/jobregisterService";
// import { FormTypeService } from "../../services/formTypeService";
import { DataService } from "../../services/data.service";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
 import {EncryptionService} from '../../services/encryption.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
   providers: [
        JobRegisterService
    ]

})
export class HeaderComponent implements OnInit {

    searchForm : FormGroup;
    formTypeList: any = [];      
    emp_id: any;
    search_data: any;
	users:any;
    check_login_status: any;
    constructor(
        private sanitizer:DomSanitizer,
  	    private jobRegisterService: JobRegisterService,
  	    // private formTypeService: FormTypeService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router: Router,
         private DataService: DataService,
        private route: ActivatedRoute,
        private EncryptionService:EncryptionService
         
    ) { }
  
    ngOnInit() {
     this.initForm();

      this.check_login_status =  this.EncryptionService.DecryptText(localStorage.getItem('webregistration'));
      console.log("login status is =>", this.check_login_status);
    }

    initForm() {

    	this.searchForm = this.formBuilder.group({
    		jobkeyword: ["", Validators.required],
    		location: ["",],
    		skill: ["", ]           
    	});
    	console.log("Search  form ",this.searchForm);
    }

  
    SearchResult(){
	    	let searchJob = new FormData();

	    	searchJob.append('job_title', this.searchForm.controls["jobkeyword"].value);
	    	searchJob.append('job_description', this.searchForm.controls["jobkeyword"].value);
	    	searchJob.append('job_skill', this.searchForm.controls["skill"].value);

        this.jobRegisterService.SearchJobListForWeb(searchJob).subscribe(res => {
                console.log("Response received from the Job Register  service.", res);
                if (res.status == 200) {
                    console.log("Response is", res);
                    this.search_data = res.data;
                    this.DataService.changeListState({list:res.data});
                    // this.DataService.setSearchResults(res.data);
                    this.router.navigate(['/mylist/searchjob']);
                   // this.searchForm.controls["home_location"].setValue(this.search_data.home_location);
                    // this.searchForm.controls["customer_document_filename"].setValue(this.search_data.customer_document_filename);
                } else {
                    console.log("JoB Search not found");
                    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Job, please try again..', '', {
                        timeOut: 2000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-error alert-with-icon",
                        positionClass: 'toast-top-center'
                    });
                }
            }, err => {
                console.log("An error occured", err);  
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Job Data, please try again..', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
        });
     }

     Logout(){
        console.log("logout function clicked");
        localStorage.removeItem('webregistration');

        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Employee Logout Successfully', '', {
            timeOut: 2000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: 'toast-top-center'
        });
         window.location.reload();

     }


}
