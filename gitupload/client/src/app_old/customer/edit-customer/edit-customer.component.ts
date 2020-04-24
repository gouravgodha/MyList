import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { CustomerService } from "../../services/customerService";
import { FormTypeService } from "../../services/formTypeService";

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-edit-customer',
    templateUrl: './edit-customer.component.html',
    styleUrls: ['./edit-customer.component.scss'],
    providers: [
        CustomerService,
        FormTypeService
    ]
})
export class EditCustomerComponent implements OnInit {

    customerEditForm : FormGroup;
    formTypeList: any = [];
    
    selectedDocument: any;

    customer_id: any;
    customer_data: any;

    constructor(
        private sanitizer:DomSanitizer,
  	    private customerService: CustomerService,
  	    private formTypeService: FormTypeService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) { }
    
    ngOnInit() {
  	    console.log("Customer edit component loaded!");
        this.initForm();
        this.fetchFormTypes();
        this.route.params.subscribe(params => {
            this.getCustomer(params['customer_id']);
            this.customer_id = params['customer_id'];
        })
    }
  
    getCustomer(customer_id){
        this.customerService.getCustomer(customer_id).subscribe(res => {
                console.log("Response received from the customerService.getCustomer service method", res);
                if (res.status == 200) {
                    console.log("Response is", res);
                    this.customer_data = res.data;
                    this.customerEditForm.controls["customer_first_name"].setValue(this.customer_data.customer_first_name);
                    this.customerEditForm.controls["customer_last_name"].setValue(this.customer_data.customer_last_name);
                    this.customerEditForm.controls["customer_email"].setValue(this.customer_data.customer_email);
                    this.customerEditForm.controls["customer_phone"].setValue(this.customer_data.customer_phone);
                    this.customerEditForm.controls["customer_policy_number"].setValue(this.customer_data.customer_policy_number);
                    this.customerEditForm.controls["customer_country"].setValue(this.customer_data.customer_country);
                    this.customerEditForm.controls["customer_state"].setValue(this.customer_data.customer_state);
                    this.customerEditForm.controls["customer_city"].setValue(this.customer_data.customer_city);
                    this.customerEditForm.controls["customer_address"].setValue(this.customer_data.customer_address);
                    this.customerEditForm.controls["customer_status"].setValue(this.customer_data.customer_status);
                    this.customerEditForm.controls["customer_form_id"].setValue(this.customer_data.customer_form_id);
                    // this.customerEditForm.controls["customer_document_filename"].setValue(this.customer_data.customer_document_filename);
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

    initForm() {
        this.customerEditForm = this.formBuilder.group({
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
            // customer_document_filename: ["", Validators.required]
        });
        console.log("Customer form ",this.customerEditForm);
    }

    fetchFormTypes(){
        this.formTypeService.getFormTypes().subscribe(res => {
            console.log("Response received from the formTypeService.getFormTypes method", res);
            if (res.status == 200) {
                this.formTypeList = res.data;
            } else {
                this.formTypeList = [];
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Form Types, please try again..', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {
            this.formTypeList = [];            
            console.log("An error occured", err);
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Form Types, please try again..', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
        });
    }

    OnFileChange(event) {
        console.log("Event value is", event);
        if (event.target.files.length > 0) {
            this.selectedDocument = event.target.files[0];
            console.log("On change file",this.selectedDocument);
        }
    }

    viewDocument(url){        
        return this.sanitizer.bypassSecurityTrustUrl(url);
        // let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.customer_data.docFilePath);
        // window.location.(sanitizedUrl);
    }

    updateCustomer() {
        console.log("Update Customer called.", this.customerEditForm);
        console.log("this", this);
        console.log("Customer id", this.customer_id);

        let editedCustomer = new FormData();

        editedCustomer.append('customer_id', this.customer_id);
        editedCustomer.append('customer_first_name', this.customerEditForm.controls["customer_first_name"].value);
        editedCustomer.append('customer_last_name', this.customerEditForm.controls["customer_last_name"].value);
        editedCustomer.append('customer_email', this.customerEditForm.controls["customer_email"].value);
        editedCustomer.append('customer_phone', this.customerEditForm.controls["customer_phone"].value);
        editedCustomer.append('customer_policy_number', this.customerEditForm.controls["customer_policy_number"].value);
        editedCustomer.append('customer_country', this.customerEditForm.controls["customer_country"].value);
        editedCustomer.append('customer_state', this.customerEditForm.controls["customer_state"].value);
        editedCustomer.append('customer_city', this.customerEditForm.controls["customer_city"].value);
        editedCustomer.append('customer_address', this.customerEditForm.controls["customer_address"].value);
        editedCustomer.append('customer_status', this.customerEditForm.controls["customer_status"].value);
        editedCustomer.append('customer_form_id', this.customerEditForm.controls["customer_form_id"].value);
        // editedCustomer.append('customer_document_filename', this.selectedDocument);

        console.log("The edited customer is", editedCustomer);
        
        this.customerService.updateCustomer(editedCustomer).subscribe(res => {
            console.log("Response received from the customerService.updateCustomer service Method", res);
            if (res.status == 200) {                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Customer Updated Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.router.navigate(['/customer']);
            } else {
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Customer Update failed.', '', {
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