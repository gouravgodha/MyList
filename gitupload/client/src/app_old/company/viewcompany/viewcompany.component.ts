import { Component, OnInit } from '@angular/core';
import { CompanyTypeService } from "../../services/companyService";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-viewcompany',
  templateUrl: './viewcompany.component.html',
  styleUrls: ['./viewcompany.component.scss'],
   providers: [CompanyTypeService]
})
export class ViewcompanyComponent implements OnInit {

  constructor(private companyTypeService: CompanyTypeService,
    private toastr: ToastrService) { }
  	companyTypesList: any = [];
	companyypesListTemp: any = [];	

  ngOnInit() {
  	console.log("i am here!");
  	this.getComapnyList();
  }



  getComapnyList() {

        this.companyTypeService.getCompanyDetails().subscribe(res => {
            console.log("Response received from the Company service", res);
            if (res.status == 200) {

                this.companyTypesList = res.data;
                this.companyypesListTemp = [...res.data];
                console.log("Response is", res);

            } else {

                this.companyTypesList = [];
                this.companyypesListTemp = [];
 
            }
        }, err => {          

            this.companyTypesList = [];
            this.companyypesListTemp = [];
            console.log("An error occured", err);
             

        });
    }

       DeleteCompanyType(id) {

        this.companyTypeService.deleteCompanyType(id).subscribe(res => {
            console.log("Response received from the Company type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Company Type Deleted Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center'
                 });
                this.getComapnyList();

            } else {
              console.log("Delete record is un-successfull!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
    }

}
