import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { BusinessTypeService } from "../../services/businessTypeService";
import { CompanyTypeService } from "../../services/companyService";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.scss'],
   providers: [CompanyTypeService]
})
export class EditcompanyComponent implements OnInit {

  companyTypeEditForm: FormGroup;
	formType:any;
	form_id: any;

	businessTypesList: any = [];
	businessTypesListTemp: any = [];

  constructor(private route: ActivatedRoute,
	 	private companyTypeService: CompanyTypeService,
	 	private toastr: ToastrService,  
	 	private businessTypeService: BusinessTypeService,
	 	private formBuilder: FormBuilder,
	 	private router: Router) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
       this.InitEditForm();
       this.GetCompanyType(params['id']);
       this.form_id = params['id']; // (+) converts string 'id' to a number       
       // In a real app: dispatch action to load the details here.
        this.getBusinessTypeList();
    });
  }

  GetCompanyType(id){
  	this.companyTypeService.getCompanyType(id).subscribe(res => {
            console.log("Response received from the company type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.formType = res.data;
                this.companyTypeEditForm.controls["bussiness_type_id"].setValue(this.formType.bussiness_type_id);
                this.companyTypeEditForm.controls["email"].setValue(this.formType.email);
                this.companyTypeEditForm.controls["company_name"].setValue(this.formType.company_name);
                this.companyTypeEditForm.controls["company_address"].setValue(this.formType.company_address);
                this.companyTypeEditForm.controls["city"].setValue(this.formType.city);
                this.companyTypeEditForm.controls["state"].setValue(this.formType.state);
                this.companyTypeEditForm.controls["phone_number"].setValue(this.formType.phone_number);
                this.companyTypeEditForm.controls["first_name"].setValue(this.formType.first_name);
                this.companyTypeEditForm.controls["last_name"].setValue(this.formType.last_name);
                this.companyTypeEditForm.controls["status"].setValue(this.formType.status);

                 // this.formTypeEditForm.controls["user_name"].setValue(this.formType.form_user_id);



            } else {
              console.log("Form type not added successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
  }


  EditCompanyType() {

       console.log("Update Company  Type called.");
        
        let updateformtype = {
            company_id: this.form_id,
            bussiness_type_id: this.companyTypeEditForm.controls["bussiness_type_id"].value,
            email: this.companyTypeEditForm.controls["email"].value,
            company_name: this.companyTypeEditForm.controls["company_name"].value,
            company_address: this.companyTypeEditForm.controls["company_address"].value,
            city: this.companyTypeEditForm.controls["city"].value,
            state: this.companyTypeEditForm.controls["state"].value,
            phone_number: this.companyTypeEditForm.controls["phone_number"].value,
            first_name: this.companyTypeEditForm.controls["first_name"].value,
            last_name: this.companyTypeEditForm.controls["last_name"].value,
            status: this.companyTypeEditForm.controls["status"].value
        }
        console.log(updateformtype);
        this.companyTypeService.updateCompanyTypes(updateformtype).subscribe(res => {
            console.log("Response received from the company type service", res);
            if (res.status == 200) {   
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Company Type Updated Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center' 
                 });
                this.router.navigate(['/company']);

            } else {
              console.log("Company  type not Updated successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
    }

  InitEditForm() {
        this.companyTypeEditForm = this.formBuilder.group({
            bussiness_type_id: ["", Validators.required],
            email: ["", Validators.required],
            company_name: ["", Validators.required],
            company_address: ["", Validators.required],
            city: ["", Validators.required],
            state: ["", Validators.required],
            phone_number: ["", Validators.required],
            first_name: ["", Validators.required],
            last_name: ["", Validators.required],
            status: ["", Validators.required]          
            
        });
        // console.log( this.formTypeEditForm);
    }


    getBusinessTypeList() {

        this.businessTypeService.getBusinessTypes().subscribe(res => {
            console.log("Response received from the business type service", res);
            if (res.status == 200) {

                this.businessTypesList = res.data;
                this.businessTypesListTemp = [...res.data];
                console.log("Response is", res);

            } else {

                this.businessTypesList = [];
                this.businessTypesListTemp = [];
 
            }
        }, err => {          

            this.businessTypesList = [];
            this.businessTypesListTemp = [];
            console.log("An error occured", err);
             

        });
    }

}
