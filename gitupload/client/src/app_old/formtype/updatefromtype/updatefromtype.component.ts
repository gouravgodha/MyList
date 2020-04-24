import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';

import { FormTypeService } from "../../services/formTypeService";
import { CompanyTypeService } from "../../services/companyService";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-updatefromtype',
  templateUrl: './updatefromtype.component.html',
  styleUrls: ['./updatefromtype.component.scss'],
    providers: [FormTypeService,CompanyTypeService]
})
export class UpdatefromtypeComponent implements OnInit {

	formTypeEditForm: FormGroup;
	formType:any;
	form_id: any;

  constructor(private route: ActivatedRoute,
	 	private formTypeService: FormTypeService,
    private companyTypeService: CompanyTypeService,
	 	private toastr: ToastrService,  
	 	private formBuilder: FormBuilder,
	 	private router: Router) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
       this.InitEditForm();
       this.getCompanyList();
       this.GetFormType(params['id']);
       this.form_id = params['id']; // (+) converts string 'id' to a number       
       // In a real app: dispatch action to load the details here.
    });
  }
company_name="";
  GetFormType(id){
  	this.formTypeService.getFormType(id).subscribe(res => {
            console.log("Response received from the business type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.formType = res.data;
                this.formTypeEditForm.controls["company_name"].setValue(this.formType.form_company_id);
                //this.company_name=this.formType.form_company_id;
                this.formTypeEditForm.controls["policy_name"].setValue(this.formType.form_title);
                this.formTypeEditForm.controls["statement"].setValue(this.formType.form_statement);
                this.formTypeEditForm.controls["video_duration"].setValue(this.formType.form_video_duration);
                this.formTypeEditForm.controls["status"].setValue(this.formType.form_status);
               // this.formTypeEditForm.controls["user_name"].setValue(this.formType.form_user_id);
                 // this.formTypeEditForm.controls["user_name"].setValue(this.formType.form_user_id);



            } else {
              console.log("Form type not added successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
  }


  UpdateFormType() {

       console.log("Update Form Type called.");
        
        let updateformtype = {
            form_id: this.form_id,
            form_company_id: this.formTypeEditForm.controls["company_name"].value,
            form_title: this.formTypeEditForm.controls["policy_name"].value,
            form_statement: this.formTypeEditForm.controls["statement"].value,
            form_video_duration: this.formTypeEditForm.controls["video_duration"].value,
            form_status: this.formTypeEditForm.controls["status"].value,
           // form_user_id: this.formTypeEditForm.controls["user_name"].value,
            form_user_id:"1",
        }
        console.log(updateformtype);
        this.formTypeService.updateFormTypes(updateformtype).subscribe(res => {
            console.log("Response received from the business type service", res);
            if (res.status == 200) {   
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Form Type Updated Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center'
                 });
                this.router.navigate(['/formtype']);

            } else {
              console.log("Form  type not added successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
    }

  InitEditForm() {
        this.formTypeEditForm = this.formBuilder.group({
            company_name: ["", Validators.required],
            policy_name: ["", Validators.required],
            statement: ["", Validators.required],
            video_duration: ["", Validators.required],
            status: ["", Validators.required],
            //user_name: ["", Validators.required],
            
        });
        console.log( this.formTypeEditForm);
    }

  companyTypesList: any = [];
  companyTypesListTemp: any = [];

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


}
