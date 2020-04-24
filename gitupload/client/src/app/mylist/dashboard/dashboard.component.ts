import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { JobSeekerService } from "../../services/jobseekerService";
// import { FormTypeService } from "../../services/formTypeService";
import { DataService } from "../../services/data.service";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
   providers: [
        JobSeekerService
    ]
})
export class DashboardComponent implements OnInit {

    employeeEditFrom : FormGroup;
    formTypeList: any = [];
    
    selectedDocument: any;

    emp_id: any;
    employee_data: any;
	users:any;
    constructor(
        private sanitizer:DomSanitizer,
  	    private jobSeekerService: JobSeekerService,
  	    // private formTypeService: FormTypeService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router: Router,
         private DataService: DataService,
        private route: ActivatedRoute,
         
    ) { }
    fileUrl:any;
    check_resume: any;
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
        let employee_id = JSON.parse(localStorage.getItem('registered_user_id'));
        employee_id = employee_id.registered_user_id;        	

        this.getEmployeeHistory(employee_id);
        this.emp_id =employee_id;
        console.log("employee id is", this.emp_id);


         this.jobSeekerService.getEmployeeById(employee_id).subscribe(res => {
         	 this.check_resume = res.data.employee_history.emp_resume;
         	console.log("check resume is", res.data.employee_history.emp_resume);
         	if (this.check_resume != null){
         		document.getElementById('resum').innerHTML = "Update Resume?";
         	}
         });



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
  
    getEmployeeHistory(emp_id){
        this.jobSeekerService.getEmployeeById(emp_id).subscribe(res => {
                console.log("Response received from the Jobseeker service.", res);
                if (res.status == 200) {
                    console.log("Response is", res);
                    this.employee_data = res.data;
                    this.employeeEditFrom.controls["emp_firstname"].setValue(this.employee_data.emp_firstname);
                    this.employeeEditFrom.controls["emp_lastname"].setValue(this.employee_data.emp_lastname);
                    this.employeeEditFrom.controls["emp_email"].setValue(this.employee_data.emp_email);
                    this.employeeEditFrom.controls["phone_number"].setValue(this.employee_data.employee_history.phone_number);
                    // this.employeeEditFrom.controls["status"].setValue(this.employee_data.employee_history.status);
                    
                    this.employeeEditFrom.controls["emp_job_title"].setValue(this.employee_data.employee_history.emp_job_title);
                    this.employeeEditFrom.controls["company_name"].setValue(this.employee_data.employee_history.company_name);
                    this.employeeEditFrom.controls["job_started_month"].setValue(this.employee_data.employee_history.job_started_month);
                    this.employeeEditFrom.controls["job_started_year"].setValue(this.employee_data.employee_history.job_started_year);
                    this.employeeEditFrom.controls["job_end_month"].setValue(this.employee_data.employee_history.job_end_month);
                    this.employeeEditFrom.controls["job_end_year"].setValue(this.employee_data.employee_history.job_end_year);
                    this.employeeEditFrom.controls["home_location"].setValue(this.employee_data.employee_history.home_location);

                    this.employeeEditFrom.controls["preferred_classification"].setValue(this.employee_data.employee_history.preferred_classification);
                    this.employeeEditFrom.controls["sub_classification"].setValue(this.employee_data.employee_history.sub_classification);
                    this.employeeEditFrom.controls["cover_letter"].setValue(this.employee_data.employee_history.cover_letter);
                    this.employeeEditFrom.controls["skill_set"].setValue(this.employee_data.employee_history.skill_set);
                    this.employeeEditFrom.controls["annual_salary"].setValue(this.employee_data.employee_history.annual_salary);
                    this.employeeEditFrom.controls["year_of_exp"].setValue(this.employee_data.employee_history.year_of_exp);
                    // this.employeeEditFrom.controls["home_location"].setValue(this.employee_data.home_location);
                    // this.employeeEditFrom.controls["customer_document_filename"].setValue(this.employee_data.customer_document_filename);
                } else {
                    console.log("Form type not added successfully!");
                    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Customer Data, please try again..', '', {
                        timeOut: 2000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-error alert-with-icon",
                        positionClass: 'toast-top-center'
                    });
                }
            }, err => {
                console.log("An error occured", err);  
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Customer Data, please try again..', '', {
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
            window.open(`https://${this.employee_data.docFilePath}`, '_blank');
    }


    initForm() {
        this.employeeEditFrom = this.formBuilder.group({
            emp_firstname: ["", Validators.required],
            emp_lastname: ["", Validators.required],
            emp_email: ["", Validators.email],
            phone_number: ["", Validators.required],
            // status: ["", Validators.required],
            emp_job_title: ["", Validators.required],
            emp_resume: ["", Validators.required],
            company_name: ["", Validators.required],
            job_started_month: ["", Validators.required],
            job_started_year: ["", Validators.required],
            job_end_month: ["", Validators.required],
            job_end_year: ["", Validators.required],
            home_location: ["", Validators.required],
            preferred_classification: ["", Validators.required],
            sub_classification: ["", Validators.required],
            cover_letter: ["", Validators.required],
            skill_set: ["", Validators.required],
            annual_salary: ["", Validators.required],
            year_of_exp: ["", Validators.required]
            // sub_classification: ["", Validators.required]
        });
        console.log("Employee form ",this.employeeEditFrom);
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

    // OnFileChange(event) {
    //     console.log("Event value is", event);
    //     if (event.target.files.length > 0) {
    //         this.selectedDocument = event.target.files[0];
    //         console.log("On change file",this.selectedDocument);
    //     }
    // }

      SelectedFile: any;
  OnFileChange(event) {
    console.log("event value is",event);
    if (event.target.files.length > 0) {
      this.SelectedFile = event.target.files[0];
      console.log("ONchange file log =>>",this.SelectedFile);
    }
  }

    viewDocument(url){        
  //       //alert("Ok"+url);
  //     this.sanitizer.bypassSecurityTrustUrl(url);
  //       // let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.employee_data.docFilePath);
     
  // window.open(url);
    }

    updateEmployee() {
        console.log("Update Employee called.", this.employeeEditFrom);
        console.log("this", this);
        // console.log("Customer id", this.customer_id);

        let editedEmployee = new FormData();
        editedEmployee.append('emp_id', this.emp_id);
        editedEmployee.append('emp_firstname', this.employeeEditFrom.controls["emp_firstname"].value);
        editedEmployee.append('emp_lastname', this.employeeEditFrom.controls["emp_lastname"].value);
        editedEmployee.append('emp_email', this.employeeEditFrom.controls["emp_email"].value);
        editedEmployee.append('emp_job_title', this.employeeEditFrom.controls["emp_job_title"].value);
        editedEmployee.append('company_name', this.employeeEditFrom.controls["company_name"].value);
        editedEmployee.append('job_started_month', this.employeeEditFrom.controls["job_started_month"].value);
        editedEmployee.append('job_started_year', this.employeeEditFrom.controls["job_started_year"].value);
        editedEmployee.append('job_end_year', this.employeeEditFrom.controls["job_end_year"].value);
        editedEmployee.append('job_end_month', this.employeeEditFrom.controls["job_end_month"].value);
        editedEmployee.append('home_location', this.employeeEditFrom.controls["home_location"].value);
        editedEmployee.append('preferred_classification', this.employeeEditFrom.controls["preferred_classification"].value);
        editedEmployee.append('sub_classification', this.employeeEditFrom.controls["sub_classification"].value);
        editedEmployee.append('emp_resume', this.SelectedFile);
        editedEmployee.append('cover_letter', this.employeeEditFrom.controls["cover_letter"].value);
        editedEmployee.append('phone_number', this.employeeEditFrom.controls["phone_number"].value);
        editedEmployee.append('skill_set', this.employeeEditFrom.controls["skill_set"].value);
        editedEmployee.append('annual_salary', this.employeeEditFrom.controls["annual_salary"].value);
        editedEmployee.append('year_of_exp', this.employeeEditFrom.controls["year_of_exp"].value);

        // editedEmployee.append('customer_document_filename', this.selectedDocument);

        console.log("The edited customer is", editedEmployee);
        
        this.jobSeekerService.updateEmployee(editedEmployee).subscribe(res => {
            console.log("Response received from the JobSeekerService.", res);
            if (res.status == 200) {                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Employee Updated Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.router.navigate(['/mylist/dashboard']);
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
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Customer Update failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
        });
    } 





}
