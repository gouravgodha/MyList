import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { JobRegisterService } from "../../services/jobregisterService";
// import { FormTypeService } from "../../services/formTypeService";
// import { CompanyTypeService } from "../../services/companyService";
import { DataService } from "../../services/data.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-addregisterjob',
  templateUrl: './addregisterjob.component.html',
  styleUrls: ['./addregisterjob.component.scss'],
    providers: [
        JobRegisterService        
    ]
})
export class AddregisterjobComponent implements OnInit {
 public Editor = ClassicEditor;
    RegisteredJobList : FormGroup;
    formTypeList: any = [];
    selectedDocument: any;

    constructor(
  	    private jobRegisterService: JobRegisterService,
  	    // private formTypeService: FormTypeService,
       //  private companyTypeService: CompanyTypeService,
        private DataService: DataService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router:Router
    ) { }
   companyTypesList: any = [];
    companyTypesListTemp: any = [];
  users:any;

  ngOnInit() {
      this.DataService.getUserState().subscribe(data=>{
       this.users=data;
       }) 
      if(localStorage.getItem('users')!=null && localStorage.getItem('users')!=undefined)
      {
       this.users=JSON.parse(localStorage.getItem('users')); 
      // console.log("company id is =>", this.users.user_company_id);
      };
        this.initForm();
        // this.fetchFormTypes();
        // this.getCompanyList();
    }  

    initForm() {
        this.RegisteredJobList = this.formBuilder.group({
        	job_title: ["", Validators.required],
            // customer_user_id: ["", Validators.required],
            job_description: ["", Validators.required],
            job_location: ["", Validators.required],
            job_skill: ["", Validators.required],
            Job_type: ["", Validators.required],
            // company_id: ["", Validators.required],
            status: ["", Validators.required]
            // customer_document_filename: ["", Validators.required]
        });
        console.log("Job Registe form ",this.RegisteredJobList);
    }

    // fetchFormTypes(){
    //     this.formTypeService.getFormTypes().subscribe(res => {
    //         console.log("Response received from the formTypeService.getFormTypes method", res);
    //         if (res.status == 200) {
    //             this.formTypeList = res.data;


    //              if(this.users.user_company_id!=1)
    //             {
    //             this.formTypeList=this.formTypeList.filter(item =>item.form_company_id==this.users.user_company_id && item.form_status == "Active");                    
    //             }

    //               if(this.users.user_company_id==1)
    //             {
    //             this.formTypeList=this.formTypeList.filter(item =>item.form_status == "Active");                    
    //             }



    //         } else {
    //             this.formTypeList = [];
    //         }
    //     }, err => {
    //         this.formTypeList = [];            
    //         console.log("An error occured", err);
    //     });
    // }

    OnFileChange(event) {
        console.log("Event value is", event);
        if (event.target.files.length > 0) {
            this.selectedDocument = event.target.files[0];
            console.log("On change file",this.selectedDocument);
        }
    }

    AddRegisterJob() {
        console.log("Add Regirstered Job called.");

        let addJob = new FormData();

        addJob.append('job_title', this.RegisteredJobList.controls["job_title"].value);
        addJob.append('job_description', this.RegisteredJobList.controls["job_description"].value);
        addJob.append('job_location', this.RegisteredJobList.controls["job_location"].value);
        addJob.append('job_skill', this.RegisteredJobList.controls["job_skill"].value);
        addJob.append('Job_type', this.RegisteredJobList.controls["Job_type"].value);
        addJob.append('company_id', this.users.user_company_id);
        addJob.append('status', this.RegisteredJobList.controls["status"].value);
        // addJob.append('customer_city', this.RegisteredJobList.controls["customer_city"].value);
        // addJob.append('customer_address', this.RegisteredJobList.controls["customer_address"].value);
        // addJob.append('customer_status', this.RegisteredJobList.controls["customer_status"].value);
        // addJob.append('customer_form_id', this.RegisteredJobList.controls["customer_form_id"].value);
        // if(this.users.user_company_id==1){
        // addJob.append('customer_company_id', this.RegisteredJobList.controls["customer_company_id"].value);
        // }else{
        // addJob.append('customer_company_id',this.users.user_company_id);    
        // }
        //addJob.append('customer_user_id', this.RegisteredJobList.controls["customer_form_id"].value);
        //addJob.append('customer_user_id', this.users.user_id);
        // addJob.append('customer_document_filename', this.selectedDocument);
        
        this.jobRegisterService.AddJobList(addJob).subscribe(res => {
            console.log("Response received from the Register Job services", res);
            if (res.status == 200) {                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Job Added Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.router.navigate(['/jobregister']);
            } else {
                console.log("Error is =>",res.data.errors[0].message);
                var error_constraint = res.data.errors[0].message;
                if(error_constraint == "customer_email must be unique")
                {
                    error_constraint = "Customer email must be unique, this is already exist in our database";
                }
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>'+error_constraint, '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {          
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Customer Creation failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });

        });
    } 

    // getCompanyList() {

    //     this.companyTypeService.getCompanyDetails().subscribe(res => {
    //         console.log("Response received from Comapny service11", res);
    //         if (res.status == 200) {
    //          this.companyTypesList = res.data;               
    //          this.companyTypesList=this.companyTypesList.filter(item =>item.company_id!='1');

    //          if(this.users.user_company_id!=1)
    //             {
    //             this.companyTypesList=this.companyTypesList.filter(item =>item.company_id==this.users.user_company_id);                    
    //             }    
    //         if(this.users.user_company_id==1)
    //         {
    //         this.companyTypesList=this.companyTypesList.filter(item =>item.status == "Active");                    
    //         } 

             
    //         } else {
    //             this.companyTypesList = [];
    //         }
    //     }, err => {          
    //           this.companyTypesList = [];
    //         console.log("An error occured", err);
             

    //     });
    // }
   
}
