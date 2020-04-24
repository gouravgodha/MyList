import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { JobRegisterService } from "../../services/jobregisterService";
// import { FormTypeService } from "../../services/formTypeService";
// import { CompanyTypeService } from "../../services/companyService";
import { DataService } from "../../services/data.service";

import { Router } from "@angular/router";
declare var $:any;

@Component({
  selector: 'app-addregisterjob',
  templateUrl: './addregisterjob.component.html',
  styleUrls: ['./addregisterjob.component.scss'],
    providers: [
        JobRegisterService        
    ]
})
export class AddregisterjobComponent implements OnInit {

 public imagePath;
 imgURL: any;
 public message: string;
 
 preview(files) {
  if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  this.imagePath = files;
  reader.readAsDataURL(files[0]); 
  reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }
}


 public Editor = ClassicEditor;
    RegisteredJobList : FormGroup;
    // RegisteredJobListDescription : FormGroup;
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
  categorydata:any
  subcategorydata:any;
  HRange: any;
  RRange: any;
  salary_type_val:any
  minimum_salary: any;
  check_data:any = true;
  getRSalaryRange_val:any;
  getHSalaryRange_val:any
  industry_id: any;

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
        this.Getindustry();
        // this.initForm1();
        // this.fetchFormTypes();
        // this.getCompanyList();


window.addEventListener('beforeunload', (event) => {
  //alert(event);

 var job_title = this.RegisteredJobList.controls["job_title"].value;
        var job_location =  this.RegisteredJobList.controls["job_location"].value;
        var industry = this.RegisteredJobList.controls["industry"].value;
        var industry_subcategory = this.RegisteredJobList.controls["industry_subcategory"].value;
        var salary_type = this.RegisteredJobList.controls["salary_type"].value;
        var Job_type = this.RegisteredJobList.controls["Job_type"].value;
        var salary_range_minimum = this.RegisteredJobList.controls["salary_range_minimum"].value;
        var salary_range_maximum = this.RegisteredJobList.controls["salary_range_maximum"].value;
        var hide_salary = this.RegisteredJobList.controls["hide_salary"].value;
        var job_summary = this.RegisteredJobList.controls["job_summary"].value;
        var job_description =  this.RegisteredJobList.controls["job_description"].value;
        var application_sent = this.RegisteredJobList.controls["application_sent"].value;
        var internal_refrence = this.RegisteredJobList.controls["internal_refrence"].value;

        console.log("hide_salary", hide_salary);
        if(job_title !=""|| job_location !="" || industry !=""|| industry_subcategory !="" || salary_type !="" || salary_range_minimum !="" || salary_range_maximum !="" || hide_salary !="" || Job_type !=""){
           // $(".nav-item.two a").trigger("click"); 
           /****insert drafted job **************/

           let addJob = new FormData();

        addJob.append('job_title', this.RegisteredJobList.controls["job_title"].value);
        addJob.append('job_description', this.RegisteredJobList.controls["job_description"].value);
        addJob.append('job_location', this.RegisteredJobList.controls["job_location"].value);
        addJob.append('industry', this.RegisteredJobList.controls["industry"].value);
        addJob.append('industry_subcategory', this.RegisteredJobList.controls["industry_subcategory"].value);
        addJob.append('Job_type', this.RegisteredJobList.controls["Job_type"].value);
        addJob.append('company_id', this.users.user_company_id);
        addJob.append('status', "Active");
        addJob.append('salary_type', this.RegisteredJobList.controls["salary_type"].value);
        addJob.append('salary_range_minimum', this.RegisteredJobList.controls["salary_range_minimum"].value);
        addJob.append('salary_range_maximum', this.RegisteredJobList.controls["salary_range_maximum"].value);
        addJob.append('hide_salary', this.RegisteredJobList.controls["hide_salary"].value);
        addJob.append('job_summary', this.RegisteredJobList.controls["job_summary"].value);
        addJob.append('application_sent', this.RegisteredJobList.controls["application_sent"].value);
        addJob.append('internal_refrence', this.RegisteredJobList.controls["internal_refrence"].value);
        addJob.append('draft', 'yes');
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

           /*********end ********/
        }
        else{
          console.log("blank.........");
            //$(".require-field").css("display","block");
        }

  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';


});


// $("li.nav-item").addEventListener('click', function (evt) {
//   console.log("Event listenr is perfromed");
//     // if (evt.target.className === 'databox') {
//     //     alert(this)
//     // }
// }, false);

        

    }  



    //get the industry list 
    Getindustry(){
         this.jobRegisterService.getIndustryList().subscribe(res => {
            console.log("Category data is", res)
            this.categorydata = res.data;

         });
    }

    GetSubIndustry(e){
      //alert(e.target.value);
       this.industry_id = e.target.value;
        console.log("Sub Category data is", this.industry_id)
       this.jobRegisterService.getSubIndustryList(this.industry_id).subscribe(res => {
            console.log("Sub Category data is", res)
            this.subcategorydata = res.data;

         });
    }


    initForm() {
        this.RegisteredJobList = this.formBuilder.group({
        	job_title: ["", Validators.required],
            job_location: ["", Validators.required],
            Job_type: ["", Validators.required],
            industry: ["", Validators.required],
            industry_subcategory: ["", Validators.required],
            salary_type: ["", Validators.required],
            salary_range_minimum: ["", Validators.required],
            salary_range_maximum: ["", Validators.required],
            hide_salary: ["", Validators.required],
            job_summary: ["", Validators.required],
            job_description: ["", Validators.required],
            application_sent: ["", Validators.required],
            internal_refrence: ["", Validators.required]
        });
        console.log("Job Registe form ",this.RegisteredJobList);

      //   $(".salary_type").on('change', function() { 
      //       if(this.value== "Hourly Rate"){

      //         this.jobRegisterService.getHSalaryRange().subscribe(res => {
      //           this.HRange = res.data;
      //       });
      //     }
      //     else{

      //         this.jobRegisterService.getHSalaryRange().subscribe(res => {
      //           this.RRange = res.data;
      //       });       

      //     }
      // });

      this.getHSalaryRange();

    }

    FindSalaryType(e){
         this.salary_type_val = e.target.value;
         if(this.salary_type_val == "Hourly Rate"){
            this. check_data = false;
            //alert("Hourly");
             this.jobRegisterService.getHSalaryRange().subscribe(res => {
                this.HRange = res.data;
            });
         }
         else{
             this. check_data = true;
           // alert("regular");
            this.jobRegisterService.getRSalaryRange().subscribe(res => {
                this.RRange = res.data;
            });
         }
        
    }

    getHSalaryRange(){

              this.jobRegisterService.getRSalaryRange().subscribe(res => {
                this.RRange = res.data;
            });
    }
   
    FindRegularMaximumSalary(e){       
        //this.check_data = true;
        this.minimum_salary = e.target.value;
         console.log("minimum salary is",this.minimum_salary);
        this.jobRegisterService.getRegularSalaryRangeFrom(this.minimum_salary).subscribe(res => {
                this.getRSalaryRange_val = res.data;
            });

    }


    FindHourlyMaximumSalary(e){       
        //this.check_data = true;
        this.minimum_salary = e.target.value;
         console.log("minimum salary is",this.minimum_salary);
        this.jobRegisterService.getHourlySalaryRangeFrom(this.minimum_salary).subscribe(res => {
                this.getHSalaryRange_val = res.data;
            });

    }

    OnFileChange(event) {
        console.log("Event value is", event);
        if (event.target.files.length > 0) {
            this.selectedDocument = event.target.files[0];
            console.log("On change file",this.selectedDocument);
        }
    }



    Description(){

        var job_title = this.RegisteredJobList.controls["job_title"].value;
        var job_location =  this.RegisteredJobList.controls["job_location"].value;
        var industry = this.RegisteredJobList.controls["industry"].value;
        var industry_subcategory = this.RegisteredJobList.controls["industry_subcategory"].value;
        var salary_type = this.RegisteredJobList.controls["salary_type"].value;
        var Job_type = this.RegisteredJobList.controls["Job_type"].value;
        var salary_range_minimum = this.RegisteredJobList.controls["salary_range_minimum"].value;
        var salary_range_maximum = this.RegisteredJobList.controls["salary_range_maximum"].value;
        var hide_salary = this.RegisteredJobList.controls["hide_salary"].value;

        console.log("hide_salary", hide_salary);
        if(job_title !="" && job_location !="" && industry !="" && industry_subcategory !="" && salary_type !="" && salary_range_minimum !="" && salary_range_maximum !="" && hide_salary !="" && Job_type !=""){
            $(".nav-item.two a").trigger("click"); 
        }
        else{
            $(".require-field").css("display","block");
        }
                
    }

    GotoOverview(){    

        var job_summary = this.RegisteredJobList.controls["job_summary"].value;
        var job_description =  this.RegisteredJobList.controls["job_description"].value;
        var application_sent = this.RegisteredJobList.controls["application_sent"].value;
        var internal_refrence = this.RegisteredJobList.controls["internal_refrence"].value;

        if(job_summary !="" && job_description !="" && application_sent !="" && internal_refrence !=""){
            $(".nav-item.three a").trigger("click"); 


        this.RegisteredJobList.controls["job_title"].setValue(this.RegisteredJobList.controls["job_title"].value);
        this.RegisteredJobList.controls["job_location"].setValue(this.RegisteredJobList.controls["job_location"].value);
        this.RegisteredJobList.controls["industry"].setValue(this.RegisteredJobList.controls["industry"].value);
        this.RegisteredJobList.controls["industry_subcategory"].setValue(this.RegisteredJobList.controls["industry_subcategory"].value);
        this.RegisteredJobList.controls["salary_type"].setValue(this.RegisteredJobList.controls["salary_type"].value);
        this.RegisteredJobList.controls["Job_type"].setValue(this.RegisteredJobList.controls["Job_type"].value);
        this.RegisteredJobList.controls["salary_range_minimum"].setValue(this.RegisteredJobList.controls["salary_range_minimum"].value);
        this.RegisteredJobList.controls["salary_range_maximum"].setValue(this.RegisteredJobList.controls["salary_range_maximum"].value);
        this.RegisteredJobList.controls["hide_salary"].setValue(this.RegisteredJobList.controls["hide_salary"].value);
        this.RegisteredJobList.controls["job_summary"].setValue(this.RegisteredJobList.controls["job_summary"].value);
        this.RegisteredJobList.controls["job_description"].setValue(this.RegisteredJobList.controls["job_description"].value);
        this.RegisteredJobList.controls["application_sent"].setValue(this.RegisteredJobList.controls["application_sent"].value);
        this.RegisteredJobList.controls["internal_refrence"].setValue(this.RegisteredJobList.controls["internal_refrence"].value);


        }
        else{
            $(".require-field").css("display","block");
        }
                
    }

  

    AddRegisterJob() {
        console.log("Add Regirstered Job called.");

        let addJob = new FormData();

        addJob.append('job_title', this.RegisteredJobList.controls["job_title"].value);
        addJob.append('job_description', this.RegisteredJobList.controls["job_description"].value);
        addJob.append('job_location', this.RegisteredJobList.controls["job_location"].value);
        addJob.append('industry', this.RegisteredJobList.controls["industry"].value);
        addJob.append('industry_subcategory', this.RegisteredJobList.controls["industry_subcategory"].value);
        addJob.append('Job_type', this.RegisteredJobList.controls["Job_type"].value);
        addJob.append('company_id', this.users.user_company_id);
        addJob.append('status', "Active");
        addJob.append('salary_type', this.RegisteredJobList.controls["salary_type"].value);
        addJob.append('salary_range_minimum', this.RegisteredJobList.controls["salary_range_minimum"].value);
        addJob.append('salary_range_maximum', this.RegisteredJobList.controls["salary_range_maximum"].value);
        addJob.append('hide_salary', this.RegisteredJobList.controls["hide_salary"].value);
        addJob.append('job_summary', this.RegisteredJobList.controls["job_summary"].value);
        addJob.append('application_sent', this.RegisteredJobList.controls["application_sent"].value);
        addJob.append('internal_refrence', this.RegisteredJobList.controls["internal_refrence"].value);
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
