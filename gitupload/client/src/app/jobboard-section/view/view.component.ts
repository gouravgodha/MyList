import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from "../../services/data.service";
import { JobBoardService } from "../../services/jobboardService";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
    providers: [JobBoardService]
})
export class ViewComponent implements OnInit {

    jobboardList: any = [];	
    users:any;

    constructor(
        private jobBoardService: JobBoardService,
        private DataService: DataService,
        private toastr: ToastrService
    ){}
  	
    ngOnInit() {
      	console.log("View JobBoardSection component loaded!");
       this.DataService.getUserState().subscribe(data=>{
       this.users=data;
       }) 
      if(localStorage.getItem('users')!=null && localStorage.getItem('users')!=undefined)
      {
       this.users=JSON.parse(localStorage.getItem('users')); 
      }   
      	this.getJobBoardList();
    }
    
    getJobBoardList() {

        this.jobBoardService.getJobBoardSection().subscribe(res => {
            console.log("Response received from the  service", res);
            if (res.status == 200) {
                this.jobboardList = res.data;  
                             
            } else {
                this.jobboardList = [];
            }
        }, err => {
            console.log("An error occured while fetching the JobBoardSection.", err);
            this.jobboardList = [];            
        });
    }

    deleteJobBoardSection(id) {
        this.jobBoardService.deleteJobBoardSection(id).subscribe(res => {
            console.log("Response received from service .Delete JobSection method", res);
            if (res.status == 200) {                                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Record  Deleted Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.getJobBoardList();
            } else {                
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Record Delete Failed.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {          
            console.log("Record delete failed", err);
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Record Delete Failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
        });
    }
}
