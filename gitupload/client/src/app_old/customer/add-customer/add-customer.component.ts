import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CustomerService } from "../../services/customerService";
import { FormTypeService } from "../../services/formTypeService";

import { Router } from "@angular/router";

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.scss'],
    providers: [
        CustomerService,
        FormTypeService
    ]
})
export class AddCustomerComponent implements OnInit {

    customerCreationForm : FormGroup;
    formTypeList: any = [];
    selectedDocument: any;

    constructor(
  	    private customerService: CustomerService,
  	    private formTypeService: FormTypeService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router:Router
    ) { }
    
    ngOnInit() {
  	    console.log("Customer add component loaded!");
        this.initForm();
        this.fetchFormTypes();
    }  

    initForm() {
        this.customerCreationForm = this.formBuilder.group({
            customer_first_name: ["", Validators.required],
            customer_last_name: ["", Validators.required],
            customer_email: ["", Validators.required],
            customer_phone: ["", Validators.required],
            customer_policy_number: ["", Validators.required],
            customer_country: ["", Validators.required],
            customer_state: ["", Validators.required],
            customer_city: ["", Validators.required],
            customer_address: ["", Validators.required],
            customer_status: ["", Validators.required],
            customer_form_id: ["", Validators.required],
            customer_document_filename: ["", Validators.required]
        });
        console.log("Customer form ",this.customerCreationForm);
    }

    fetchFormTypes(){
        this.formTypeService.getFormTypes().subscribe(res => {
            console.log("Response received from the formTypeService.getFormTypes method", res);
            if (res.status == 200) {
                this.formTypeList = res.data;
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
        newCustomer.append('customer_document_filename', this.selectedDocument);
        
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
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Customer Creation failed.', '', {
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
}