import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from "../../services/data.service";
import { JobSeekerService } from "../../services/jobseekerService";

@Component({
  selector: 'app-jobseeker',
  templateUrl: './jobseeker.component.html',
  styleUrls: ['./jobseeker.component.scss'],
  providers: [JobSeekerService]
})
export class JobseekerComponent implements OnInit {

    employeeList: any = [];	
    users:any;

    constructor(
        private jobSeekerService: JobSeekerService,
        private DataService: DataService,
        private toastr: ToastrService
    ){}
  	
    ngOnInit() {
      	console.log("View customers component loaded!");
       this.DataService.getUserState().subscribe(data=>{
       this.users=data;
       }) 
      if(localStorage.getItem('users')!=null && localStorage.getItem('users')!=undefined)
      {
       this.users=JSON.parse(localStorage.getItem('users')); 
      }   
      	this.getEmployeeList();
    }
    
    getEmployeeList() {

        this.jobSeekerService.getEmployee().subscribe(res => {
            console.log("Response received from the Jobseeker service", res);
            if (res.status == 200) {
                this.employeeList = res.data;  
                if(this.users.user_company_id!=1)
                {
                this.employeeList=this.employeeList.filter(item =>item.customer_company_id==this.users.user_company_id);                    
                }              
            } else {
                this.employeeList = [];
            }
        }, err => {
            console.log("An error occured while fetching the customers.", err);
            this.employeeList = [];            
        });
    }

    // deleteCustomer(customer_id) {
    //     this.customerService.deleteCustomer(customer_id).subscribe(res => {
    //         console.log("Response received from customerService.deleteCustomer method", res);
    //         if (res.status == 200) {                                
    //             this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Customer  Deleted Successfully.', '', {
    //                 timeOut: 2000,
    //                 closeButton: true,
    //                 enableHtml: true,
    //                 toastClass: "alert alert-success alert-with-icon",
    //                 positionClass: 'toast-top-center'
    //             });
    //             this.getCustomerList();
    //         } else {                
    //             this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Customer Delete Failed.', '', {
    //                 timeOut: 2000,
    //                 closeButton: true,
    //                 enableHtml: true,
    //                 toastClass: "alert alert-error alert-with-icon",
    //                 positionClass: 'toast-top-center'
    //             });
    //         }
    //     }, err => {          
    //         console.log("Customer delete failed", err);
    //         this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Customer Delete Failed.', '', {
    //             timeOut: 2000,
    //             closeButton: true,
    //             enableHtml: true,
    //             toastClass: "alert alert-error alert-with-icon",
    //             positionClass: 'toast-top-center'
    //         });
    //     });
    // }
}
