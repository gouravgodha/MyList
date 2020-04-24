import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerService } from "../../services/customerService";
import { JobBoardService } from "../../services/jobboardService";
import { DataService } from "../../services/data.service";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
   providers: [
        JobBoardService
    ]
})
export class EditComponent implements OnInit {

    customerEditForm : FormGroup;      
    selectedDocument: any;
    id: any;
    customer_data: any;
	users:any;
    constructor(
        private sanitizer:DomSanitizer,
  	    private jobBoardService: JobBoardService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router: Router,
         private DataService: DataService,
        private route: ActivatedRoute,
         
    ) { }
    fileUrl:any;
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
        this.route.params.subscribe(params => {
            this.getCustomer(params['id']);
            this.id = params['id'];
        })
    }
  
    getCustomer(id){
        this.jobBoardService.getJobBoardSectionById(id).subscribe(res => {
                console.log("Response received from the customerService.getCustomer service method", res);
                if (res.status == 200) {
                    console.log("Response is", res);
                    this.customer_data = res.data;
                    this.customerEditForm.controls["title"].setValue(this.customer_data.title);
                    this.customerEditForm.controls["description"].setValue(this.customer_data.description);
                    //this.customerEditForm.controls["image"].setValue(this.customer_data.image);
                    this.customerEditForm.controls["button_name"].setValue(this.customer_data.button_name);
                    this.customerEditForm.controls["status"].setValue(this.customer_data.status);
                    // this.customerEditForm.controls["customer_document_filename"].setValue(this.customer_data.customer_document_filename);
                } else {
                    console.log("Form type not added successfully!");
                    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the  Data, please try again..', '', {
                        timeOut: 2000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-error alert-with-icon",
                        positionClass: 'toast-top-center'
                    });
                }
            }, err => {
                console.log("An error occured", err);  
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the  Data, please try again..', '', {
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
            title: ["", Validators.required],
            // customer_user_id: ["", Validators.required],
            description: ["", Validators.required],
           // image: ["", Validators.required],
            button_name: ["", Validators.required],
            status: ["", Validators.required]
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
  //       //alert("Ok"+url);
  //     this.sanitizer.bypassSecurityTrustUrl(url);
  //       // let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.customer_data.docFilePath);
     
  // window.open(url);
    }

    updateCustomer() {
        console.log("Update Customer called.", this.customerEditForm);
        console.log("this", this);
        console.log("Customer id", this.id);

        let editedCustomer = new FormData();

        editedCustomer.append('id', this.id);
        editedCustomer.append('title', this.customerEditForm.controls["title"].value);
        editedCustomer.append('description', this.customerEditForm.controls["description"].value);
        editedCustomer.append('button_name', this.customerEditForm.controls["button_name"].value);
       editedCustomer.append('status', this.customerEditForm.controls["status"].value);
      
        console.log("The edited customer is", editedCustomer);
        
        this.jobBoardService.updateJobList(editedCustomer).subscribe(res => {
            console.log("Response received from the customerService. service Method", res);
            if (res.status == 200) {                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>JobBoardSection Updated Successfully.', '', {
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
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>JobBoardSection Update failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
        });
    } 





}
