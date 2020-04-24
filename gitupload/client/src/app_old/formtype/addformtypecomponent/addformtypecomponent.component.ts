import { Component, OnInit } from '@angular/core';
import { FormTypeService } from "../../services/formTypeService";
import { CompanyTypeService } from "../../services/companyService";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-addformtypecomponent',
  templateUrl: './addformtypecomponent.component.html',
  styleUrls: ['./addformtypecomponent.component.scss'],
   providers: [FormTypeService,CompanyTypeService]
})
export class AddformtypecomponentComponent implements OnInit {

  FormType : FormGroup;
  constructor(private formTypeService: FormTypeService,
    private toastr: ToastrService, private formBuilder: FormBuilder,  private companyTypeService: CompanyTypeService) { }

    formTypesList: any = [];
	formTypesListTemp: any = [];

  ngOnInit() {
  	 console.log("Form type add component loaded!");
     this.InitForm();
     this.getCompanyList();
  }

    InitForm() {
        this.FormType = this.formBuilder.group({
            company_name: ["", Validators.required],
            policy_name: ["", Validators.required],
            statement: ["", Validators.required],
            video_duration: ["", Validators.required],
            status: ["", Validators.required]
            // user_name: ["", Validators.required]
            
        });
        console.log( this.FormType);
    }

      AddFormType() {

       console.log("Add Form  Type called.");
        
        let newformtype = {
            
           form_company_id: this.FormType.controls["company_name"].value,
            form_title: this.FormType.controls["policy_name"].value,
             form_statement: this.FormType.controls["statement"].value,
              form_video_duration: this.FormType.controls["video_duration"].value,
               form_status: this.FormType.controls["status"].value,
                form_user_id: "1"
        }
        console.log(newformtype);
        this.formTypeService.addformTypes(newformtype).subscribe(res => {
            console.log("Response received from the business type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Form Type Added Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center'
                 });

            } else {
              console.log("Business type not added successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
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
