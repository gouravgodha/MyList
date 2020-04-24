import { Component, OnInit } from '@angular/core';
import { UserTypeService } from "../../services/userService";
import { CompanyTypeService } from "../../services/companyService";
import { UserRoleService } from "../../services/userRoleService";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
  providers: [UserTypeService,CompanyTypeService,UserRoleService]
})
export class AdduserComponent implements OnInit {

 FormType : FormGroup;
  constructor(
  	private userTypeService: UserTypeService,
  	private companyTypeService: CompanyTypeService,
    private userRoleService: UserRoleService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router:Router
    ) { }

    userTypesList: any = [];
	userTypesListTemp: any = [];

	companyTypesList: any = [];
	companyTypesListTemp: any = [];

  userrollTypesList: any = [];
  userrollTypesListTemp: any = [];
  ngOnInit() {
  	 console.log("Company type add component loaded!");
     this.InitForm();
     this.getCompanyList();
     this.getUserRollList();
  }

  //  SelectedFile: any;
  // OnFileChange(event) {
  //   console.log("event value is",event);
  //   if (event.target.files.length > 0) {
  //     this.SelectedFile = event.target.files[0];
  //     console.log("ONchange file log =>>",this.SelectedFile);
  //   }
  // }


    InitForm() {
        this.FormType = this.formBuilder.group({
            user_company_id: ["", Validators.required],
            user_job_title: ["", Validators.required],
            user_first_name: ["", Validators.required],
            user_last_name: ["", Validators.required],
            user_email: ["", Validators.required],
            user_phone_number: ["", Validators.required],
            user_address: ["", Validators.required],
            user_city: ["", Validators.required],
            user_state: ["", Validators.required],
            user_country: ["", Validators.required],
            user_status: ["", Validators.required],
            user_role_id: ["", Validators.required],
            user_password: ["", Validators.required]
            
        });
        console.log( this.FormType);
    }

      AddCompanyType() {

       console.log("Add Company Type called."); 
   
        let newusertype = {
            
           user_company_id: this.FormType.controls["user_company_id"].value,
            user_job_title: this.FormType.controls["user_job_title"].value,
             user_first_name: this.FormType.controls["user_first_name"].value,
              user_last_name: this.FormType.controls["user_last_name"].value,
               user_email: this.FormType.controls["user_email"].value,
                user_phone_number: this.FormType.controls["user_phone_number"].value,
                user_address: this.FormType.controls["user_address"].value,
                user_city: this.FormType.controls["user_city"].value,
                user_state: this.FormType.controls["user_state"].value,
                user_country: this.FormType.controls["user_country"].value,
                user_status: this.FormType.controls["user_status"].value,
                user_role_id: this.FormType.controls["user_role_id"].value,
                user_password: this.FormType.controls["user_password"].value,
        }
        console.log(newusertype);
        this.userTypeService.adduserTypes(newusertype).subscribe(res => {
            console.log("Response received from the User service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>User  Added Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center'
                 });
                this.router.navigate(['/user'])


            } else {
              console.log("User not added successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
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

