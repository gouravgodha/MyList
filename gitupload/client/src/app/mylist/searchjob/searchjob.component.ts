import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { EncryptionService } from '../../services/encryption.service';
import { ToastrService } from 'ngx-toastr';
import { JobRegisterService } from "../../services/jobregisterService";

declare var $:any;
@Component({
  selector: 'app-searchjob',
  templateUrl: './searchjob.component.html',
  styleUrls: ['./searchjob.component.scss'],
   providers: [
        EncryptionService, JobRegisterService      
    ]
})
export class SearchjobComponent implements OnInit {
check_login_status: any;
  constructor(
     private jobRegisterService: JobRegisterService,
    private DataService:DataService,
    private EncryptionService: EncryptionService,
     private toastr: ToastrService,
    ) 
  { 
this.DataService.getListState().subscribe(res=>{
	console.log("Receiving data from DataService.getSearchResults", res);
	this.list=res.list;
})
  }
list=[]
  ngOnInit() {
     $.getScript("assets/js/web/home.js");
    // $.getScript( "assets/js/main.min.js");



     (function() {
         var $body = document.body
         , $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];
         
         if ( typeof $menu_trigger !== 'undefined' ) {
         $menu_trigger.addEventListener('click', function() {
             $body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
         });
         }
         
         }).call(this);


    
  
  }

  //   ngAfterViewInit(){
  // 	console.log("The view has initialized");

  // 	this.list.length = 0;
  // 	this.list = [...this.DataService.getSearchResults()];

  // }


  ApplyForJob(job_id,company_id){

     /*** check employee is loggedin or not **/
       this.check_login_status =  this.EncryptionService.DecryptText(localStorage.getItem('webregistration'));
      console.log("login status issss =>", this.check_login_status);
     // console.log("job id is", job_id);
      /** end **/

     // console.log("localStorage value is=>", JSON.parse(localStorage.getItem('registered_user_id')).registered_user_id);
      
      
    if(this.check_login_status == "registered" && this.check_login_status!= null &&  this.check_login_status !=undefined)
    {

       let addJob = new FormData();
        addJob.append('job_id', job_id);
        addJob.append('employee_id', JSON.parse(localStorage.getItem('registered_user_id')).registered_user_id);
        addJob.append('company_id',company_id);
        this.jobRegisterService.ApplyForJob(addJob).subscribe(res => {
            console.log("Response received from the Register Job services", res);
            if (res.status == 200) {                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Job Applyed Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                //this.router.navigate(['/jobregister']);
            }
            else if(res.status ==300){
               this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>You have already apply for this job', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-warning alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }

             else {
                //console.log("Error is =>",res.data.errors[0].message);
                //var error_constraint = res.data.errors[0].message;
                // if(error_constraint == "customer_email must be unique")
                // {
                //     error_constraint = "Customer email must be unique, this is already exist in our database";
                // }
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> There is some error on system!', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {          
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Job Application Creation failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });

        });

    }
    else{

      this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>You need to login first to apply into this job.', '', {
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-error alert-with-icon",
        positionClass: 'toast-top-center'
      });

      console.log("sorry brother you need to login first before applying on job",this.check_login_status);
    }


  }

}
