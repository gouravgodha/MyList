import { Component, OnInit } from '@angular/core';
import { BusinessTypeService } from "../../services/businessTypeService";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-business-type-add',
  templateUrl: './business-type-add.component.html',
  styleUrls: ['./business-type-add.component.scss'],
  
})


export class BusinessTypeAddComponent implements OnInit {

  BusinessType : FormGroup;

  constructor(private businessTypeService: BusinessTypeService,
    private toastr: ToastrService,  private formBuilder: FormBuilder,  private router:Router) { }

  	businessTypesList: any = [];
	businessTypesListTemp: any = [];	

  ngOnInit() {
   console.log("Business type add component loaded!");
     this.InitForm();
  }

   InitForm() {
        this.BusinessType = this.formBuilder.group({
            business_type: ["", Validators.required],
            business_status: ["", Validators.required]
            
        });
        console.log( this.BusinessType);
    }

     AddBusinessType() {

       console.log("Add Form Type called.");
        
        let newbusinesstype = {
            
            business_type: this.BusinessType.controls["business_type"].value,
            business_status: this.BusinessType.controls["business_status"].value
        }
        console.log(newbusinesstype);
        this.businessTypeService.addBusinessTypes(newbusinesstype).subscribe(res => {
            console.log("Response received from the business type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Business Type Added Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center'
                 });
                   this.router.navigate(['/businesstype'])


            } else {
              console.log("Business type not added successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
    }


}
