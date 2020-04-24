import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EncryptionService } from '../../services/encryption.service';
import { JobSeekerService } from "../../services/jobseekerService";
// import { FormTypeService } from "../../services/formTypeService";
// import { CompanyTypeService } from "../../services/companyService";
import { DataService } from "../../services/data.service";

import { Router } from "@angular/router";



@Component({
  selector: 'app-footer-web',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
   providers: [
        JobSeekerService,EncryptionService      
    ]
})
export class FooterComponent implements OnInit {
 public Editor = ClassicEditor;
    RegisteredEmployeform : FormGroup;
    LoginForm: FormGroup;
    formTypeList: any = [];
    selectedDocument: any;

    constructor(
  	    private jobSeekerService: JobSeekerService,
  	    // private formTypeService: FormTypeService,
       //  private companyTypeService: CompanyTypeService,
        private DataService: DataService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router:Router,
        private EncryptionService: EncryptionService,
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
      };
        this.initForm();
        // this.fetchFormTypes();
        // this.getCompanyList();
    }  

    initForm() {
        this.RegisteredEmployeform = this.formBuilder.group({
        	emp_firstname: ["", Validators.required],
            emp_lastname: ["", Validators.required],
            emp_email: ["", Validators.email],
            emp_pass: ["", Validators.required]
        });

        /* login activity **/
        this.LoginForm = this.formBuilder.group({
           // emp_firstname: ["", Validators.required],
           // emp_lastname: ["", Validators.required],
            emp_email: ["", Validators.email],
            emp_pass: ["", Validators.required]
        });
        /** end **/

        console.log("Employee Login Form",this.LoginForm);
    }

  
    OnFileChange(event) {
        console.log("Event value is", event);
        if (event.target.files.length > 0) {
            this.selectedDocument = event.target.files[0];
            console.log("On change file",this.selectedDocument);
        }
    }

    AddRegisterJob() {
        console.log("Employee Registration process start..");

        let addemployee = new FormData();

        addemployee.append('emp_firstname', this.RegisteredEmployeform.controls["emp_firstname"].value);
        addemployee.append('emp_lastname', this.RegisteredEmployeform.controls["emp_lastname"].value);
        addemployee.append('emp_email', this.RegisteredEmployeform.controls["emp_email"].value);
        addemployee.append('emp_pass', this.RegisteredEmployeform.controls["emp_pass"].value);
        addemployee.append('status', 'Active');
        
        this.jobSeekerService.AddEmployee(addemployee).subscribe(res => {
            console.log("Response received from the Employee Adding servsices gggg", res);
            if (res.status == 200) { 
              localStorage.setItem('webregistration', this.EncryptionService.EncryptText('registered')); 
              var registered_user={
              	registered_user_id:res.data.id
              };
              localStorage.setItem('registered_user_id',JSON.stringify(registered_user));           
               

                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Employee Registered Successfully', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.router.navigate(['/mylist']);
            } else {
                console.log("Error is =>",res.data.errors[0].message);
                var error_constraint = res.data.errors[0].message;
                if(error_constraint == "emp_email must be unique")
                {
                    error_constraint = "Employee email must be unique, this is already exist in our database";
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
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Employee Registration  failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });

        });
    } 


    // Login authentication
LoginAuth(formData) {
  let data = {
    'emp_email': formData.value.emp_email,
    'emp_pass': formData.value.emp_pass
  };
  console.log("login data is",data);

  // this.LoginFormInit();
  this.jobSeekerService.getloginData(data).subscribe(res => {
    console.log("Responce log is",res);
    if (res.status == 200) {

              localStorage.setItem('webregistration', this.EncryptionService.EncryptText('registered')); 
                var registered_user={
                    registered_user_id:res.data.id
                };
                localStorage.setItem('registered_user_id',JSON.stringify(registered_user));           


                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Employee LoggedIn Successfully', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.router.navigate(['/mylist/dashboard']);
                 window.location.reload();

    } else {

    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Employee Login Failed!', '', {
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-error alert-with-icon",
        positionClass: 'toast-top-center'
    });


    }
  }, err => {
    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Employee Login  failed.', '', {
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
