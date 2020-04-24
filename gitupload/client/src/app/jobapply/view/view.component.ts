import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from "../../services/data.service";
import { JobApplyService } from "../../services/jobapplyService";
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
declare var $:any;

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
    jobfilterdata:boolean=true;
    myForm: FormGroup;    
    allSelected = false;

    constructor(
        private jobApplyService: JobApplyService,
        private DataService: DataService,
        private toastr: ToastrService,
        private fb: FormBuilder
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

        this.myForm = this.fb.group({
          id: this.fb.array([])
        });

    }


    onChange(id, isChecked: boolean) {
        const idFormArray = <FormArray>this.myForm.controls.id;

        if (isChecked) {
          idFormArray.push(new FormControl(id));
      } else {
          let index = idFormArray.controls.findIndex(x => x.value == id)
          idFormArray.removeAt(index);
      }
      console.log("checked id form array is", idFormArray.value);
      return idFormArray.value;
  }

  SelectunselectAll(){
    const idFormArray = <FormArray>this.myForm.controls.id;
    if(!this.allSelected){
       /*** unselecting the all check box before select it **/
        for(let  i =0; i < this.jobList.length;i++){
            console.log("length is ", this.jobList.length);
            let index = idFormArray.controls.findIndex(x => x.value == this.jobList[i].id)
            idFormArray.removeAt(index);
              $(".checkbox").prop("checked", false);
           // console.log("form array is",idFormArray.value);
        }
        /**** end **/
        for(let  i =0; i < this.jobList.length;i++){
            console.log("length is ", this.jobList.length);
            idFormArray.push(new FormControl(this.jobList[i].id));
            $(".checkbox").prop("checked", true);
             console.log("form array is",idFormArray.value);

        }    
        this.allSelected = true;
    } else {
         for(let  i =0; i < this.jobList.length;i++){
            console.log("length is ", this.jobList.length);
            let index = idFormArray.controls.findIndex(x => x.value == this.jobList[i].id)
            idFormArray.removeAt(index);
              $(".checkbox").prop("checked", false);
            console.log("form array is",idFormArray.value);
        }

        //idFormArray.removeAt(index);
        this.allSelected = false;
    }
    
  }


     downloadp(resume){

          window.open(`http://localhost:8217/documents/${resume}`, '_blank');
    }

    Selected_Candidate(data){

        const idFormArray = <FormArray>this.myForm.controls.id;
        //console.log("Selected Candidate is o", data);
        console.log("Selected Candidate is", idFormArray.value);
      // console.log("final =>", Object.assign({}, idFormArray));
        //return false;

        this.jobApplyService.updateJobApply(idFormArray.value).subscribe(res=>{
            console.log("Update  data is =>", res);
            //this.joblistdata=res.data;
            if (res.status == 200)
            {
              this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Candidate Assigned to Shortlist Categories Successfully.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-success alert-with-icon",
                positionClass: 'toast-top-center'
            });
          }

           if (res.status == 404)
            {
              this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Record update failed, no record found to update.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
          }


       }) 


    }


    // toHTML(input) : any {
    //     return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
    // }

    FilterByJobApply(job_id){
          this.jobfilterdata = true;
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

    FilterJobTypeByInput(text){
    $("#expiredjob").value = "";


        let data ={
                job_title: text,
                company_id:JSON.parse(localStorage.getItem('users')).user_company_id
            }

            console.log("data is =>",data);
           // return false;

              this.jobApplyService.getJobApplyListByFilterByInput(data).subscribe(res => {
                console.log("Response received from filter service", res);
                if (res.status == 200) {
                    this.jobfilterdata = false;
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



      FilterExpiredJobTypeByInput(text){
        $("#activejob").value = "";



        let data ={
                job_title: text,
                company_id:JSON.parse(localStorage.getItem('users')).user_company_id
            }

            console.log("data is =>",data);
           // return false;

              this.jobApplyService.getExpiredJobApplyListByFilterByInput(data).subscribe(res => {
                console.log("Response received from FilterExpiredJobTypeByInput service", res);
                if (res.status == 200) {
                    this.jobfilterdata = false;
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
    

    /*** search candiddate **/

    SearchCandidates(res){
        let search_key = res;
       let select_filter =  $(".filetebyjobtype").val();
     if(select_filter == "activejob"){
        this.FilterJobTypeByInput(search_key);
     }
     else{
         this.FilterExpiredJobTypeByInput(search_key);
     }

    }

    /*** end **/

    getJobApplyList() {

        this.jobApplyService.getJobApplyList().subscribe(res => {
            console.log("Response received service", res);
            if (res.status == 200) {
                 this.jobfilterdata = true;
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

    FilterJobType(value){
         this.jobfilterdata = true;
        if(value == "activejob"){

                this.jobApplyService.getJobApplyList().subscribe(res => {
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
        else{

            

        this.jobApplyService.getExJobApplyList().subscribe(res => {
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

    }


    SendEmail(){

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
