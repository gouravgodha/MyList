import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from "../../services/data.service";
import { JobApplyService } from "../../services/jobapplyService";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [JobApplyService]
})
export class ViewComponent implements OnInit {

    jobList: any = [];	
    joblistdata: any = [];
    users:any;

    constructor(
        private jobApplyService: JobApplyService,
        private DataService: DataService,
        private toastr: ToastrService
    ){}
  	
    ngOnInit() {
      	//console.log("View customers component loaded!");
         let data ={
                 company_id:JSON.parse(localStorage.getItem('users')).user_company_id
            }
        this.jobApplyService.getJobApplyListByFilterbycompany(data).subscribe(res=>{
            console.log("filter company data is =>", res);
            this.joblistdata=res.data;
       }) 


       this.DataService.getUserState().subscribe(data=>{
       this.users=data;
       }) 
      if(localStorage.getItem('users')!=null && localStorage.getItem('users')!=undefined)
      {
       this.users=JSON.parse(localStorage.getItem('users')); 
      }   
      	this.getJobApplyList();
    }



     downloadp(resume){

          window.open(`http://localhost:8217/documents/${resume}`, '_blank');
    }

    Selected_Candidate(data){
        this.jobApplyService.updateJobApply(data).subscribe(res=>{
            console.log("Update  data is =>", res);
            //this.joblistdata=res.data;
             this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Candidate Assigned to Shortlist Categories Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });

       }) 


    }


    // toHTML(input) : any {
    //     return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
    // }

    FilterByJobApply(job_id){
            let data ={
                job_id: job_id,
                company_id:JSON.parse(localStorage.getItem('users')).user_company_id
            }

            console.log("data is =>",data);
           // return false;

              this.jobApplyService.getJobApplyListByFilter(data).subscribe(res => {
                console.log("Response received from filter service", res);
                if (res.status == 200) {
                    this.jobList = res.data;  
                    if(this.users.user_company_id!=1)
                    {
                        this.jobList=this.jobList.filter(item =>item.company_id==this.users.user_company_id);                    
                        // this.jobList = [];
                    }              
                } else {
                    this.jobList = [];
                }
            }, err => {
                console.log("An error occured while fetching the Registered Job.", err);
                this.jobList = [];            
            });
    }
    
    getJobApplyList() {

        this.jobApplyService.getJobApplyListSelected().subscribe(res => {
            console.log("Response received service", res);
            if (res.status == 200) {
                this.jobList = res.data;  
                if(this.users.user_company_id!=1)
                {
                this.jobList=this.jobList.filter(item =>item.company_id==this.users.user_company_id);                    
                // this.jobList = [];
                }              
            } else {
                this.jobList = [];
            }
        }, err => {
            console.log("An error occured while fetching the Registered Job.", err);
            this.jobList = [];            
        });
    }


    // SearchResult(serch_keyword){
    // console.log("search keword", serch_keyword.target.value);
        
    //     let payload = {
    //         search_term: serch_keyword.target.value
    //     }

    //      this.jobRegisterService.SearchJobList(payload).subscribe(res => {
    //         console.log("Response received from the jobRegisterService service", res);
    //         if (res.status == 200) {
    //             this.jobList = res.data;  
    //             if(this.users.user_company_id!=1)
    //             {
    //             this.jobList=this.jobList.filter(item =>item.customer_company_id==this.users.user_company_id);                    
    //             }              
    //         } else {
    //             this.jobList = [];
    //         }
    //     }, err => {
    //         console.log("An error occured while fetching the Registered Job.", err);
    //         this.jobList = [];            
    //     });
    // }

    // deleteJob(id) {
    //     this.jobRegisterService.deleteJob(id).subscribe(res => {
    //         console.log("Response received from Service", res);
    //         if (res.status == 200) {                                
    //             this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Job  Deleted Successfully.', '', {
    //                 timeOut: 2000,
    //                 closeButton: true,
    //                 enableHtml: true,
    //                 toastClass: "alert alert-success alert-with-icon",
    //                 positionClass: 'toast-top-center'
    //             });
    //             this.getJobList();
    //         } else {                
    //             this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Job Delete Failed.', '', {
    //                 timeOut: 2000,
    //                 closeButton: true,
    //                 enableHtml: true,
    //                 toastClass: "alert alert-error alert-with-icon",
    //                 positionClass: 'toast-top-center'
    //             });
    //         }
    //     }, err => {          
    //         console.log("Customer delete failed", err);
    //         this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Job Delete Failed.', '', {
    //             timeOut: 2000,
    //             closeButton: true,
    //             enableHtml: true,
    //             toastClass: "alert alert-error alert-with-icon",
    //             positionClass: 'toast-top-center'
    //         });
    //     });
    // }
}
