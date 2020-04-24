import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { JobRegisterService } from "../../services/jobregisterService";
// import { FormTypeService } from "../../services/formTypeService";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DataService } from "../../services/data.service";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

declare var $:any;

@Component({
  selector: 'app-editregisterjob',
  templateUrl: './editregisterjob.component.html',
  styleUrls: ['./editregisterjob.component.scss'],
    providers: [
        JobRegisterService
    ]
})
export class EditregisterjobComponent implements OnInit {

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
    registeredEditForm : FormGroup;
    formTypeList: any = [];
    
    selectedDocument: any;

    id: any;
    registered_job: any;
    users:any;
    industry_id:any;
    constructor(
        private sanitizer:DomSanitizer,
        private jobRegisterService: JobRegisterService,
        // private formTypeService: FormTypeService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router: Router,
         private DataService: DataService,
        private route: ActivatedRoute,
         
    ) { }
    fileUrl:any;
    categorydata:any
  subcategorydata:any;
  HRange: any;
  RRange: any;
  salary_type_val:any
  minimum_salary: any;
  check_data:any = true;
  getRSalaryRange_val:any;
  subcategoryEdiddata:any;
  getHSalaryRange_val:any
    ngOnInit() {
         this.DataService.getUserState().subscribe(data=>{
       this.users=data;
       }) 
      if(localStorage.getItem('users')!=null && localStorage.getItem('users')!=undefined)
      {
       this.users=JSON.parse(localStorage.getItem('users')); 
      };
        console.log("Customer edit component loaded!");
           this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl
        this.initForm();
        // this.fetchFormTypes();
        this.route.params.subscribe(params => {
            this.getEmployeeHistory(params['id']);
            this.id = params['id'];
        })

        //   $(".salary_type").on('change', function() { 
        //     if(this.value== "Hourly Rate"){
        // $('.salary_range_minimum select').html('<option value="">Salary Minimum</option><option value="0">0</option><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="30">30</option>');
        // $('.salary_range_maximum select').html('<option value="">Salary Maximum</option><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="30">30</option><option value="35">35</option>');
        //     }
        //     else{
        // $('.salary_range_minimum select').html('<option value="">Salary Minimum</option><option value="0">0</option>                                      <option value="100">100</option>                                      <option value="500">500</option>                                      <option value="1000">1000</option>                                      <option value="2000">2000</option>                                      <option value="5000">5000</option>                                      <option value="10000">10000</option>                                      <option value="20000">20000</option>                                      <option value="30000">30000</option>                                      <option value="40000">40000</option>                                      <option value="50000">50000</option>');
        // $('.salary_range_maximum select').html('<option value="">Salary Maximum</option>                                        <option value="0">0</option>                                        <option value="100">100</option>                                        <option value="500">500</option>                                        <option value="1000">1000</option>                                        <option value="2000">2000</option>                                        <option value="5000">5000</option>                                        <option value="10000">10000</option>                                        <option value="20000">20000</option>                                        <option value="30000">30000</option>                                        <option value="40000">40000</option>                                        <option value="50000">50000</option>');        
        //     }
        // });




this.Getindustry();
this.getHSalaryRange();



    }



    //get the industry list 
    Getindustry(){
         this.jobRegisterService.getIndustryList().subscribe(res => {
            console.log("Category data is", res)
            this.categorydata = res.data;
            //this.GetSubIndustry(this.registeredEditForm.controls["industry"].value);
            this.GetEditSubIndustry(this.registeredEditForm.controls["industry"].value);

         });
    }

    GetSubIndustry(e){
         this.industry_id = e.target.value;

       // alert(this.industry_id);
       this.jobRegisterService.getSubIndustryList(this.industry_id).subscribe(res => {
            console.log("Sub Category data is", res)
            this.subcategorydata = res.data;

         });
    }



GetEditSubIndustry(industry_subcategory){
    this.jobRegisterService.getSubIndustryListById(industry_subcategory).subscribe(res => {
    console.log("Sub Category data issss", res)
    this.subcategorydata = res.data;
    });
        if(this.registeredEditForm.controls["salary_type"].value == "Hourly Rate"){
            this. check_data = false;
            this.jobRegisterService.getHSalaryRange().subscribe(res => {
                this.HRange = res.data;
            });
         this.EditFindHourlyMaximumSalary(this.registeredEditForm.controls["salary_range_minimum"].value);
        }

        else{
           // alert("regular");
             this. check_data = true;
            this.jobRegisterService.getRSalaryRange().subscribe(res => {
                this.RRange = res.data;
            });
            this.EditFindRegularMaximumSalary(this.registeredEditForm.controls["salary_range_minimum"].value);
        }
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
            //alert("regular");
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


    EditFindRegularMaximumSalary(minimum_salary_Regular){       
        //this.check_data = true;
       // alert(minimum_salary_Regular);
         console.log("minimum salary is",minimum_salary_Regular);
        this.jobRegisterService.getRegularSalaryRangeFrom(minimum_salary_Regular).subscribe(res => {
                console.log("Maximu salary is", res);
                this.getRSalaryRange_val = res.data;
            });

    }


    EditFindHourlyMaximumSalary(minimum_salary_hourly){       
        //this.check_data = true;
       // alert(minimum_salary_hourly);
        
         console.log("minimum salary is",minimum_salary_hourly);
        this.jobRegisterService.getHourlySalaryRangeFrom(minimum_salary_hourly).subscribe(res => {
                this.getHSalaryRange_val = res.data;
            });

    }


 Description(){

        var job_title = this.registeredEditForm.controls["job_title"].value;
        var job_location =  this.registeredEditForm.controls["job_location"].value;
        var industry = this.registeredEditForm.controls["industry"].value;
        var industry_subcategory = this.registeredEditForm.controls["industry_subcategory"].value;
        var salary_type = this.registeredEditForm.controls["salary_type"].value;
        var Job_type = this.registeredEditForm.controls["Job_type"].value;
        var salary_range_minimum = this.registeredEditForm.controls["salary_range_minimum"].value;
        var salary_range_maximum = this.registeredEditForm.controls["salary_range_maximum"].value;
        var hide_salary = this.registeredEditForm.controls["hide_salary"].value;

        if(job_title !="" && job_location !="" && industry !="" && industry_subcategory !="" && salary_type !="" && salary_range_minimum !="" && salary_range_maximum !="" && hide_salary !="" && Job_type !=""){
            $(".nav-item.two a").trigger("click"); 
        }
        else{
            $(".require-field").css("display","block");
        }
                
    }


    GotoOverview(){    

        var job_summary = this.registeredEditForm.controls["job_summary"].value;
        var job_description =  this.registeredEditForm.controls["job_description"].value;
        var application_sent = this.registeredEditForm.controls["application_sent"].value;
        var internal_refrence = this.registeredEditForm.controls["internal_refrence"].value;

        if(job_summary !="" && job_description !="" && application_sent !="" && internal_refrence !=""){
            $(".nav-item.three a").trigger("click"); 


        this.registeredEditForm.controls["job_title"].setValue(this.registeredEditForm.controls["job_title"].value);
        this.registeredEditForm.controls["job_location"].setValue(this.registeredEditForm.controls["job_location"].value);
        this.registeredEditForm.controls["industry"].setValue(this.registeredEditForm.controls["industry"].value);
        this.registeredEditForm.controls["industry_subcategory"].setValue(this.registeredEditForm.controls["industry_subcategory"].value);
        this.registeredEditForm.controls["salary_type"].setValue(this.registeredEditForm.controls["salary_type"].value);
        this.registeredEditForm.controls["Job_type"].setValue(this.registeredEditForm.controls["Job_type"].value);
        this.registeredEditForm.controls["salary_range_minimum"].setValue(this.registeredEditForm.controls["salary_range_minimum"].value);
        this.registeredEditForm.controls["salary_range_maximum"].setValue(this.registeredEditForm.controls["salary_range_maximum"].value);
        this.registeredEditForm.controls["hide_salary"].setValue(this.registeredEditForm.controls["hide_salary"].value);
        this.registeredEditForm.controls["job_summary"].setValue(this.registeredEditForm.controls["job_summary"].value);
        this.registeredEditForm.controls["job_description"].setValue(this.registeredEditForm.controls["job_description"].value);
        this.registeredEditForm.controls["application_sent"].setValue(this.registeredEditForm.controls["application_sent"].value);
        this.registeredEditForm.controls["internal_refrence"].setValue(this.registeredEditForm.controls["internal_refrence"].value);


        }
        else{
            $(".require-field").css("display","block");
        }
                
    }



  
    getEmployeeHistory(id){
        this.jobRegisterService.getJobById(id).subscribe(res => {
                console.log("Response received from the Job register service.", res);
                if (res.status == 200) {
                    console.log("Response is", res);
                    this.registered_job = res.data;
                    this.registeredEditForm.controls["job_title"].setValue(this.registered_job.job_title);
                    this.registeredEditForm.controls["job_description"].setValue(this.registered_job.job_description);
                    this.registeredEditForm.controls["job_location"].setValue(this.registered_job.job_location);
                    // this.registeredEditForm.controls["job_skill"].setValue(this.registered_job.job_skill);
                    this.registeredEditForm.controls["Job_type"].setValue(this.registered_job.Job_type);
                    this.registeredEditForm.controls["industry"].setValue(this.registered_job.industry);
                    this.registeredEditForm.controls["industry_subcategory"].setValue(this.registered_job.industry_subcategory);
                    this.registeredEditForm.controls["salary_type"].setValue(this.registered_job.salary_type);
                    this.registeredEditForm.controls["salary_range_minimum"].setValue(this.registered_job.salary_range_minimum);
                    this.registeredEditForm.controls["salary_range_maximum"].setValue(this.registered_job.salary_range_maximum);
                    this.registeredEditForm.controls["hide_salary"].setValue(this.registered_job.hide_salary);
                    this.registeredEditForm.controls["job_summary"].setValue(this.registered_job.job_summary);
                    this.registeredEditForm.controls["application_sent"].setValue(this.registered_job.application_sent);
                    this.registeredEditForm.controls["internal_refrence"].setValue(this.registered_job.internal_refrence);
                    this.registeredEditForm.controls["draft"].setValue(this.registered_job.draft);                              

                    // // this.registeredEditForm.controls["company_id"].setValue(this.registered_job.company_id);
                    this.registeredEditForm.controls["status"].setValue(this.registered_job.status);
                    // this.registeredEditForm.controls["customer_document_filename"].setValue(this.registered_job.customer_document_filename);
                } else {
                  //  console.log("Form type not added successfully!");
                    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Job Data, please try again..', '', {
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


      downloadp()
    {
            window.open(`https://${this.registered_job.docFilePath}`, '_blank');
    }


    initForm() {
        this.registeredEditForm = this.formBuilder.group({
            job_title: ["", Validators.required],
            job_description: ["", Validators.required],
            job_location: ["", Validators.required],
            // job_skill: ["", Validators.required],
            Job_type: ["", Validators.required],
            industry: ["", Validators.required],
            industry_subcategory: ["", Validators.required],
            salary_type: ["", Validators.required],
            salary_range_minimum: ["", Validators.required],
             salary_range_maximum: ["", Validators.required],
              hide_salary: [""],
               job_summary: ["", Validators.required],
                application_sent: ["", Validators.required],
                internal_refrence: ["", Validators.required],
                draft: ["", Validators.required],
            // company_id: ["", Validators.required],
            status: ["", Validators.required]
           
        });
        console.log("Employee form ",this.registeredEditForm);
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
    //             this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Form Types, please try again..', '', {
    //                 timeOut: 2000,
    //                 closeButton: true,
    //                 enableHtml: true,
    //                 toastClass: "alert alert-error alert-with-icon",
    //                 positionClass: 'toast-top-center'
    //             });
    //         }
    //     }, err => {
    //         this.formTypeList = [];            
    //         console.log("An error occured", err);
    //         this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Form Types, please try again..', '', {
    //             timeOut: 2000,
    //             closeButton: true,
    //             enableHtml: true,
    //             toastClass: "alert alert-error alert-with-icon",
    //             positionClass: 'toast-top-center'
    //         });
    //     });
    // }

    OnFileChange(event) {
        console.log("Event value is", event);
        if (event.target.files.length > 0) {
            this.selectedDocument = event.target.files[0];
            console.log("On change file",this.selectedDocument);
        }
    }

    viewDocument(url){        
  //       //alert("Ok"+url);
  //     this.sanitizer.bypassSecurityTrustUrl(url);
  //       // let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.registered_job.docFilePath);
     
  // window.open(url);
    }

    updateJobList() {
        console.log("Update Joblist.", this.registeredEditForm);
        console.log("this", this);
        // console.log("Customer id", this.customer_id);

        let editedEmployee = new FormData();
        editedEmployee.append('id', this.id);
        editedEmployee.append('job_title', this.registeredEditForm.controls["job_title"].value);
        editedEmployee.append('job_description', this.registeredEditForm.controls["job_description"].value);
        editedEmployee.append('job_location', this.registeredEditForm.controls["job_location"].value);
        // editedEmployee.append('job_skill', this.registeredEditForm.controls["job_skill"].value);
        editedEmployee.append('Job_type', this.registeredEditForm.controls["Job_type"].value);
        editedEmployee.append('industry', this.registeredEditForm.controls["industry"].value);
        editedEmployee.append('industry_subcategory', this.registeredEditForm.controls["industry_subcategory"].value);
        editedEmployee.append('salary_type', this.registeredEditForm.controls["salary_type"].value);
        editedEmployee.append('salary_range_minimum', this.registeredEditForm.controls["salary_range_minimum"].value);
        editedEmployee.append('salary_range_maximum', this.registeredEditForm.controls["salary_range_maximum"].value);
        editedEmployee.append('hide_salary', this.registeredEditForm.controls["hide_salary"].value);
        editedEmployee.append('job_summary', this.registeredEditForm.controls["job_summary"].value);
        editedEmployee.append('application_sent', this.registeredEditForm.controls["application_sent"].value);
        editedEmployee.append('internal_refrence', this.registeredEditForm.controls["internal_refrence"].value);
        editedEmployee.append('draft', this.registeredEditForm.controls["draft"].value);        
                   
        // editedEmployee.append('company_id', this.registeredEditForm.controls["company_id"].value);
        editedEmployee.append('status', this.registeredEditForm.controls["status"].value);
       

        // editedEmployee.append('customer_document_filename', this.selectedDocument);

        console.log("The edited Job is", editedEmployee);
        
        this.jobRegisterService.updateJobList(editedEmployee).subscribe(res => {
            console.log("Response received from the Register job services.", res);
            if (res.status == 200) {                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Job Updated Successfully.', '', {
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
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Job Update failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
        });
    } 





}
