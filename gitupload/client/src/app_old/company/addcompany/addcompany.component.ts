import { Component, OnInit } from '@angular/core';
import { CompanyTypeService } from "../../services/companyService";
import { BusinessTypeService } from "../../services/businessTypeService";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";
@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.scss'],
    providers: [CompanyTypeService]
})
export class AddcompanyComponent implements OnInit {

  FormType : FormGroup;
  constructor(
  	private companyTypeService: CompanyTypeService,
  	private businessTypeService: BusinessTypeService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router:Router
    ) { }

    formTypesList: any = [];
	formTypesListTemp: any = [];

	businessTypesList: any = [];
	businessTypesListTemp: any = [];

  ngOnInit() {
  	 console.log("Company type add component loaded!");
     this.InitForm();
     this.getBusinessTypeList();
  }

   SelectedFile: any;
  OnFileChange(event) {
    console.log("event value is",event);
    if (event.target.files.length > 0) {
      this.SelectedFile = event.target.files[0];
      console.log("ONchange file log =>>",this.SelectedFile);
    }
  }


    InitForm() {
        this.FormType = this.formBuilder.group({
            bussiness_type_id: ["", Validators.required],
            email: ["", Validators.required],
            company_name: ["", Validators.required],
            company_address: ["", Validators.required],
            city: ["", Validators.required],
            state: ["", Validators.required],
            company_logo: ["", Validators.required],
            phone_number: ["", Validators.required],
            first_name: ["", Validators.required],
            last_name: ["", Validators.required],
            status: ["", Validators.required]
            
        });
        console.log( this.FormType);
    }

      AddCompanyType() {

       console.log("Add Company Type called.");
        
        let fd = new FormData();

    fd.append('bussiness_type_id', this.FormType.controls["bussiness_type_id"].value);
    fd.append('email', this.FormType.controls["email"].value);
    fd.append('company_name', this.FormType.controls["company_name"].value);
    fd.append('company_address', this.FormType.controls["company_address"].value);
    fd.append('city', this.FormType.controls["city"].value);
    fd.append('state', this.FormType.controls["state"].value);
    fd.append('company_logo', this.SelectedFile);
    fd.append('phone_number', this.FormType.controls["phone_number"].value);
    fd.append('first_name', this.FormType.controls["first_name"].value);
    // fd.append('phone_number', this.FormType.controls["bussiness_type_id"].value,);
    fd.append('last_name', this.FormType.controls["last_name"].value);
    fd.append('status', this.FormType.controls["status"].value);




        // let newcompanytype = {
            
        //    bussiness_type_id: this.FormType.controls["bussiness_type_id"].value,
        //     email: this.FormType.controls["email"].value,
        //      company_name: this.FormType.controls["company_name"].value,
        //       company_address: this.FormType.controls["company_address"].value,
        //        city: this.FormType.controls["city"].value,
        //         state: this.FormType.controls["state"].value,
        //         company_logo: this.SelectedFile,
        //         phone_number: this.FormType.controls["phone_number"].value,
        //         first_name: this.FormType.controls["first_name"].value,
        //         last_name: this.FormType.controls["last_name"].value,
        //         status: this.FormType.controls["status"].value,
        // }
        console.log(fd);
        this.companyTypeService.addcompanyTypes(fd).subscribe(res => {
            console.log("Response received from the Company type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Company Type Added Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center'
                 });
                this.router.navigate(['/company'])


            } else {
              console.log("Company type not added successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
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
