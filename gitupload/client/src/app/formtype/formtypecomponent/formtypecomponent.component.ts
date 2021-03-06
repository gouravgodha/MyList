import { Component, OnInit } from '@angular/core';
import { FormTypeService } from "../../services/formTypeService";
import { DataService } from "../../services/data.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formtypecomponent',
  templateUrl: './formtypecomponent.component.html',
  styleUrls: ['./formtypecomponent.component.scss'],
   providers: [FormTypeService]
})
export class FormtypecomponentComponent implements OnInit {

  constructor(
    private formTypeService: FormTypeService,
    private DataService: DataService,
    private toastr: ToastrService) { }
  	formTypesList: any = [];
	formTypesListTemp: any = [];	
    users:any;
  ngOnInit() {
  	console.log("i am here!");
      this.DataService.getUserState().subscribe(data=>{
       this.users=data;
       }) 
      if(localStorage.getItem('users')!=null && localStorage.getItem('users')!=undefined)
      {
       this.users=JSON.parse(localStorage.getItem('users')); 
      }
  	this.getFormTypeList();
  }



  getFormTypeList() {

        this.formTypeService.getFormTypes().subscribe(res => {
            console.log("Response received from the business type service", res);
            if (res.status == 200) {

                this.formTypesList = res.data;

                 if(this.users.user_company_id!=1)
                {
                this.formTypesList=this.formTypesList.filter(item =>item.form_company_id==this.users.user_company_id);                    
                }  
                
                this.formTypesListTemp = [...res.data];
                console.log("Response is", res);

            } else {

                this.formTypesList = [];
                this.formTypesListTemp = [];
 
            }
        }, err => {          

            this.formTypesList = [];
            this.formTypesListTemp = [];
            console.log("An error occured", err);
             

        });
    }

       DeleteFormType(id) {

        this.formTypeService.deleteFormType(id).subscribe(res => {
            console.log("Response received from the business type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Form Type Deleted Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center'
                 });
                this.getFormTypeList();

            } else {
              console.log("Delete record is un-successfull!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
    }

}
