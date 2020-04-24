import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CustomerService } from "../../services/customerService";
import { FormTypeService } from "../../services/formTypeService";
import { CompanyTypeService } from "../../services/companyService";
import { DataService } from "../../services/data.service";

import { Router } from "@angular/router";

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.scss'],
    providers: [
        CustomerService,
        FormTypeService,CompanyTypeService
    ]
})
export class AddCustomerComponent implements OnInit {

    customerCreationForm : FormGroup;
    formTypeList: any = [];
    selectedDocument: any;

    constructor(
  	    private customerService: CustomerService,
  	    private formTypeService: FormTypeService,
        private companyTypeService: CompanyTypeService,
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
      };
        this.initForm();
        this.fetchFormTypes();
        this.getCompanyList();
    }  

    initForm() {
        this.customerCreationForm = this.formBuilder.group({
            customer_company_id: ["", Validators.required],
            // customer_user_id: ["", Validators.required],
            customer_first_name: ["", Validators.required],
            customer_last_name: ["", Validators.required],
            customer_email: ["", Validators.email],
            customer_phone: ["", Validators.required],
            customer_policy_number: ["", Validators.required],
            customer_country: ["", Validators.required],
            customer_state: ["", Validators.required],
            customer_city: ["", Validators.required],
            customer_address: ["", Validators.required],
            customer_status: ["", Validators.required],
            customer_form_id: ["", Validators.required]
            // customer_document_filename: ["", Validators.required]
        });
        console.log("Customer form ",this.customerCreationForm);
    }

    fetchFormTypes(){
        this.formTypeService.getFormTypes().subscribe(res => {
            console.log("Response received from the formTypeService.getFormTypes method", res);
            if (res.status == 200) {
                this.formTypeList = res.data;


                 if(this.users.user_company_id!=1)
                {
                this.formTypeList=this.formTypeList.filter(item =>item.form_company_id==this.users.user_company_id && item.form_status == "Active");                    
                }

                  if(this.users.user_company_id==1)
                {
                this.formTypeList=this.formTypeList.filter(item =>item.form_status == "Active");                    
                }



            } else {
                this.formTypeList = [];
            }
        }, err => {
            this.formTypeList = [];            
            console.log("An error occured", err);
        });
    }

    OnFileChange(event) {
        console.log("Event value is", event);
        if (event.target.files.length > 0) {
            this.selectedDocument = event.target.files[0];
            console.log("On change file",this.selectedDocument);
        }
    }

    addCustomer() {
        console.log("Add Customer called.");

        let newCustomer = new FormData();

        newCustomer.append('customer_first_name', this.customerCreationForm.controls["customer_first_name"].value);
        newCustomer.append('customer_last_name', this.customerCreationForm.controls["customer_last_name"].value);
        newCustomer.append('customer_email', this.customerCreationForm.controls["customer_email"].value);
        newCustomer.append('customer_phone', this.customerCreationForm.controls["customer_phone"].value);
        newCustomer.append('customer_policy_number', this.customerCreationForm.controls["customer_policy_number"].value);
        newCustomer.append('customer_country', this.customerCreationForm.controls["customer_country"].value);
        newCustomer.append('customer_state', this.customerCreationForm.controls["customer_state"].value);
        newCustomer.append('customer_city', this.customerCreationForm.controls["customer_city"].value);
        newCustomer.append('customer_address', this.customerCreationForm.controls["customer_address"].value);
        newCustomer.append('customer_status', this.customerCreationForm.controls["customer_status"].value);
        newCustomer.append('customer_form_id', this.customerCreationForm.controls["customer_form_id"].value);
        if(this.users.user_company_id==1){
        newCustomer.append('customer_company_id', this.customerCreationForm.controls["customer_company_id"].value);
        }else{
        newCustomer.append('customer_company_id',this.users.user_company_id);    
        }
        //newCustomer.append('customer_user_id', this.customerCreationForm.controls["customer_form_id"].value);
        newCustomer.append('customer_user_id', this.users.user_id);
        // newCustomer.append('customer_document_filename', this.selectedDocument);
        
        this.customerService.addCustomer(newCustomer).subscribe(res => {
            console.log("Response received from the userRole.addUserRole service Method", res);
            if (res.status == 200) {                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Customer Added Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.router.navigate(['/customer']);
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

    getCompanyList() {

        this.companyTypeService.getCompanyDetails().subscribe(res => {
            console.log("Response received from Comapny service11", res);
            if (res.status == 200) {
             this.companyTypesList = res.data;               
             this.companyTypesList=this.companyTypesList.filter(item =>item.company_id!='1');

             if(this.users.user_company_id!=1)
                {
                this.companyTypesList=this.companyTypesList.filter(item =>item.company_id==this.users.user_company_id);                    
                }    
            if(this.users.user_company_id==1)
            {
            this.companyTypesList=this.companyTypesList.filter(item =>item.status == "Active");                    
            } 

             
            } else {
                this.companyTypesList = [];
            }
        }, err => {          
              this.companyTypesList = [];
            console.log("An error occured", err);
             

        });
    }
   
}