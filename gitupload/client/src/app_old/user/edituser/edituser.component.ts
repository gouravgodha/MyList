import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { UserTypeService } from "../../services/userService";
import { CompanyTypeService } from "../../services/companyService";
import { UserRoleService } from "../../services/userRoleService";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss'],
  providers: [CompanyTypeService,UserTypeService,UserRoleService]
})
export class EdituserComponent implements OnInit {

  companyTypeEditForm: FormGroup;
	formType:any;
	form_id: any;

	companyTypesList: any = [];
	companyTypesListTemp: any = [];

   userrollTypesList: any = [];
  userrollTypesListTemp: any = [];

  constructor(private route: ActivatedRoute,
	 	private companyTypeService: CompanyTypeService,
	 	private toastr: ToastrService,  
	 	private userTypeService: UserTypeService,
     private userRoleService: UserRoleService,
	 	private formBuilder: FormBuilder,
	 	private router: Router) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
       this.InitEditForm();
       this.GetUserType(params['id']);
       this.form_id = params['id']; // (+) converts string 'id' to a number       
       // In a real app: dispatch action to load the details here.
        this.getCompanyList();
         this.getUserRollList();
    });
  }

  GetUserType(id){
  	this.userTypeService.getUser(id).subscribe(res => {
            console.log("Response received from the User type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.formType = res.data;
                this.companyTypeEditForm.controls["user_company_id"].setValue(this.formType.user_company_id);
                this.companyTypeEditForm.controls["user_role_id"].setValue(this.formType.user_role_id);
                this.companyTypeEditForm.controls["user_job_title"].setValue(this.formType.user_job_title);
                this.companyTypeEditForm.controls["user_first_name"].setValue(this.formType.user_first_name);
                this.companyTypeEditForm.controls["user_last_name"].setValue(this.formType.user_last_name);
                this.companyTypeEditForm.controls["user_email"].setValue(this.formType.user_email);
                this.companyTypeEditForm.controls["user_phone_number"].setValue(this.formType.user_phone_number);
                this.companyTypeEditForm.controls["user_status"].setValue(this.formType.user_status);
                this.companyTypeEditForm.controls["user_address"].setValue(this.formType.user_address);
                this.companyTypeEditForm.controls["user_city"].setValue(this.formType.user_city);
                this.companyTypeEditForm.controls["user_state"].setValue(this.formType.user_state);
                this.companyTypeEditForm.controls["user_country"].setValue(this.formType.user_country);


                 // this.formTypeEditForm.controls["user_name"].setValue(this.formType.form_user_id);



            } else {
              console.log("User Not Updated successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
  }


  SaveCompanyType() {

       console.log("Update Company  Type called.");
        
        let updateformtype = {
            user_id: this.form_id,
            user_company_id: this.companyTypeEditForm.controls["user_company_id"].value,
            user_role_id: this.companyTypeEditForm.controls["user_role_id"].value,
            user_job_title: this.companyTypeEditForm.controls["user_job_title"].value,
            user_first_name: this.companyTypeEditForm.controls["user_first_name"].value,
            user_last_name: this.companyTypeEditForm.controls["user_last_name"].value,
            user_email: this.companyTypeEditForm.controls["user_email"].value,
            user_phone_number: this.companyTypeEditForm.controls["user_phone_number"].value,
            user_status: this.companyTypeEditForm.controls["user_status"].value,
            user_address: this.companyTypeEditForm.controls["user_address"].value,
            user_city: this.companyTypeEditForm.controls["user_city"].value,
            user_state: this.companyTypeEditForm.controls["user_state"].value,
            user_country: this.companyTypeEditForm.controls["user_country"].value,
        }
        console.log(updateformtype);
        this.userTypeService.updateUserTypes(updateformtype).subscribe(res => {
            console.log("Response received from the user type service", res);
            if (res.status == 200) {   
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> User Type Updated Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center' 
                 });
                this.router.navigate(['/user']);

            } else {
              console.log("User  type not Updated successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
    }

  InitEditForm() {
        this.companyTypeEditForm = this.formBuilder.group({
            user_company_id: ["", Validators.required],
            user_role_id: ["", Validators.required],
            user_job_title: ["", Validators.required],
            user_first_name: ["", Validators.required],
            user_last_name: ["", Validators.required],
            user_email: ["", Validators.required],
            user_phone_number: ["", Validators.required],
            user_status: ["", Validators.required],
            user_address: ["", Validators.required],
            user_city: ["", Validators.required],
            user_state: ["", Validators.required],
            user_country: ["", Validators.required]        
           
            
        });
        // console.log( this.formTypeEditForm);
    }


   getCompanyList() {

        this.companyTypeService.getCompanyDetails().subscribe(res => {
            console.log("Response received from Comapny service11", res);
            if (res.status == 200) {

                this.companyTypesList = res.data;
                this.companyTypesListTemp = [...res.data];
                console.log("Response is", res);

            } else {

                this.companyTypesList = [];
                this.companyTypesListTemp = [];
 
            }
        }, err => {          

            this.companyTypesList = [];
            this.companyTypesListTemp = [];
            console.log("An error occured", err);
             

        });
    }

      getUserRollList() {

        this.userRoleService.getUserRoles().subscribe(res => {
            console.log("Response received from UserRollService", res);
            if (res.status == 200) {

                this.userrollTypesList = res.data;
                this.userrollTypesListTemp = [...res.data];
                console.log("Response is", res);

            } else {

                this.userrollTypesList = [];
                this.userrollTypesListTemp = [];
 
            }
        }, err => {          

            this.userrollTypesList = [];
            this.userrollTypesListTemp = [];
            console.log("An error occured", err);
             

        });
    }

}
