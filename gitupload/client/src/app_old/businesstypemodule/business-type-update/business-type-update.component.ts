import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';

import { BusinessTypeService } from "../../services/businessTypeService";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-business-type-update',
  templateUrl: './business-type-update.component.html',
  styleUrls: ['./business-type-update.component.scss']
})
export class BusinessTypeUpdateComponent implements OnInit {

	businessTypeEditForm: FormGroup;
	businessType:any;
	business_type_id: any;

 	constructor(
	 	private route: ActivatedRoute,
	 	private businessTypeService: BusinessTypeService,
	 	private toastr: ToastrService,  
	 	private formBuilder: FormBuilder,
	 	private router: Router
	) {}

  ngOnInit() {
  	this.route.params.subscribe(params => {
       this.InitEditForm();
       this.GetBusinessType(params['id']);
       this.business_type_id = params['id']; // (+) converts string 'id' to a number       
       // In a real app: dispatch action to load the details here.
    });
  }

  GetBusinessType(id){
  	this.businessTypeService.getBusinessType(id).subscribe(res => {
            console.log("Response received from the business type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.businessType = res.data;
                this.businessTypeEditForm.controls["business_type"].setValue(this.businessType.business_type);
                this.businessTypeEditForm.controls["business_status"].setValue(this.businessType.business_status);

            } else {
              console.log("Business type not added successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
  }


  UpdateBusinessType() {

       console.log("Update Business Type called.");
        
        let updatebusinesstype = {
            business_type_id: this.business_type_id,
            business_type: this.businessTypeEditForm.controls["business_type"].value,
            business_status: this.businessTypeEditForm.controls["business_status"].value
        }
        console.log(updatebusinesstype);
        this.businessTypeService.updateBusinessTypes(updatebusinesstype).subscribe(res => {
            console.log("Response received from the business type service", res);
            if (res.status == 200) {   
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Business Type Deleted Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center'
                 });
                this.router.navigate(['/businesstype']);

            } else {
              console.log("Business type not added successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
    }

  InitEditForm() {
        this.businessTypeEditForm = this.formBuilder.group({
            business_type: ["", Validators.required],
            business_status: ["", Validators.required]
            
        });
        console.log( this.businessTypeEditForm);
    }

}
