import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from "../../services/data.service";
import { JobRegisterService } from "../../services/jobregisterService";
import * as moment from 'moment';

@Component({
  selector: 'app-draftjob',
  templateUrl: './draftjob.component.html',
  styleUrls: ['./draftjob.component.scss'],
  providers: [JobRegisterService]
})
export class DraftjobComponent implements OnInit {

    jobList: any = [];	
    users:any;
    jobcount:any;
 
  today = new Date(); 

    constructor(
        private jobRegisterService: JobRegisterService,
        private DataService: DataService,
          private router: Router,
        private toastr: ToastrService
    ){}
  	
    ngOnInit() {

    this.jobRegisterService.getJobListApplyJobCount().subscribe(data=>{
        
         this.jobcount=data;
     })


      	//console.log("View customers component loaded!");
       this.DataService.getUserState().subscribe(data=>{
       this.users=data;
       }) 
      if(localStorage.getItem('users')!=null && localStorage.getItem('users')!=undefined)
      {
       this.users=JSON.parse(localStorage.getItem('users')); 
      }   
      	this.getJobList();
    }

    // toHTML(input) : any {
    //     return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
    // }


        DuplicateEntry(id){
        //alert(id);

        this.jobRegisterService.getJobByIdforduplicate(id).subscribe(data=>{
        // this.users=data;
        console.log("Duplicate record is =>", data.data.id);        
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Duplicate Job Created Successfully.', '', {
            timeOut: 2000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: 'toast-top-center'
        });
      
         this.router.navigate(['/jobregister/edit/'+data.data.id]);

        //this.getJobList();
        }) 

        }


        Expire(id){
            let editedEmployee = new FormData();
             editedEmployee.append('id', id);
            editedEmployee.append('status', 'Deactive');
            this.jobRegisterService.updateJobList(editedEmployee).subscribe(res=>{
                console.log("Response received from the Register job services.", res);
                if (res.status == 200) {                
                    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Job Expire Successfully.', '', {
                        timeOut: 2000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-success alert-with-icon",
                        positionClass: 'toast-top-center'
                    });
                    this.router.navigate(['/expiredjobs']);
                }

            })     

        }
    
    getJobList() {

        this.jobRegisterService.getDraftJobList().subscribe(res => {
            console.log("Response received from the jobRegisterService service", res);
            if (res.status == 200) {
                
                this.jobList = res.data;  
                if(this.users.user_company_id!=1)
                {
                this.jobList=this.jobList.filter(item =>item.company_id==this.users.user_company_id);                    
                }              
            } else {
                this.jobList = [];
            }
        }, err => {
            console.log("An error occured while fetching the Registered Job.", err);
            this.jobList = [];            
        });
    }


    SearchResult(serch_keyword){
    console.log("search keword", serch_keyword.target.value);
        
        let payload = {
            search_term: serch_keyword.target.value
        }

         this.jobRegisterService.SearchJobList(payload).subscribe(res => {
            console.log("Response received from the jobRegisterService service", res);
            if (res.status == 200) {
                
                this.jobList = res.data;  
                if(this.users.user_company_id!=1)
                {
                this.jobList=this.jobList.filter(item =>item.company_id==this.users.user_company_id);                    
                }              
            } else {
                this.jobList = [];
            }
        }, err => {
            console.log("An error occured while fetching the Registered Job.", err);
            this.jobList = [];            
        });
    }

    deleteJob(id) {
        this.jobRegisterService.deleteJob(id).subscribe(res => {
            console.log("Response received from Service", res);
            if (res.status == 200) {                                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Job  Deleted Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.getJobList();
            } else {                
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Job Delete Failed.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {          
            console.log("Customer delete failed", err);
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Job Delete Failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
        });
    }
}
