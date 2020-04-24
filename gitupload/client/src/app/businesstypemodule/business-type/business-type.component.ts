import { Component, OnInit } from '@angular/core';
import { BusinessTypeService } from "../../services/businessTypeService";
import { ToastrService } from 'ngx-toastr';
// import { Routes, RouterModule } from '@angular/router';
@Component({
  selector: 'app-business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.scss'],
  
})
export class BusinessTypeComponent implements OnInit {

  constructor(private businessTypeService: BusinessTypeService,
    private toastr: ToastrService) { }

  	businessTypesList: any = [];
	businessTypesListTemp: any = [];	

  ngOnInit() {
   console.log("i am here!");
  	this.getBusinessTypeList();
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

      DeleteBusinessType(id) {

        this.businessTypeService.deleteBusinessType(id).subscribe(res => {
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
                this.getBusinessTypeList();

            } else {
              console.log("Delete record is un-successfull!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
    }


    //  AddBusinessType() {

    //     this.businessTypeService.deleteBusinessType(id).subscribe(res => {
    //         console.log("Response received from the business type service", res);
    //         if (res.status == 200) {                
    //             console.log("Response is", res);
    //             this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Business Type Deleted Successfully.', '', {
    //                timeOut: 2000,
    //                closeButton: true,
    //                enableHtml: true,
    //                toastClass: "alert alert-success alert-with-icon",
    //                positionClass: 'toast-top-center'
    //              });
    //             this.getBusinessTypeList();

    //         } else {
    //           console.log("Delete record is un-successfull!");
    //         }
    //     }, err => {          

    //         console.log("An error occured", err);         


    //     });
    // }


}
