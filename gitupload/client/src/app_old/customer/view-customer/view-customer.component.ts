import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CustomerService } from "../../services/customerService";

@Component({
    selector: 'app-view-customer',
    templateUrl: './view-customer.component.html',
    styleUrls: ['./view-customer.component.scss'],
    providers: [CustomerService]
})
export class ViewCustomerComponent implements OnInit {

    customerList: any = [];	

    constructor(
        private customerService: CustomerService,
        private toastr: ToastrService
    ){}
  	
    ngOnInit() {
      	console.log("View customers component loaded!");
      	this.getCustomerList();
    }
    
    getCustomerList() {

        this.customerService.getCustomers().subscribe(res => {
            console.log("Response received from the Company service", res);
            if (res.status == 200) {
                this.customerList = res.data;                
            } else {
                this.customerList = [];
            }
        }, err => {
            console.log("An error occured while fetching the customers.", err);
            this.customerList = [];            
        });
    }

    deleteCustomer(customer_id) {
        this.customerService.deleteCustomer(customer_id).subscribe(res => {
            console.log("Response received from customerService.deleteCustomer method", res);
            if (res.status == 200) {                                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Company Type Deleted Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.getCustomerList();
            } else {                
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Customer Delete Failed.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {          
            console.log("Customer delete failed", err);
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Customer Delete Failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
        });
    }
}