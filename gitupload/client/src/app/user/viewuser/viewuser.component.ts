import { Component, OnInit } from '@angular/core';
import { UserTypeService } from "../../services/userService";
import { DataService } from "../../services/data.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss'],
    providers: [UserTypeService]
})
export class ViewuserComponent implements OnInit {

   constructor(
     private userTypeService: UserTypeService,
     private DataService: DataService,
    private toastr: ToastrService) { }
  	userTypesList: any = [];
	usertypesListTemp: any = [];	
  users:any;

  ngOnInit() {
  	  this.DataService.getUserState().subscribe(data=>{
       this.users=data;
       }) 
      if(localStorage.getItem('users')!=null && localStorage.getItem('users')!=undefined)
      {
       this.users=JSON.parse(localStorage.getItem('users')); 
      }
  	  this.getUserList();
    
  }



  getUserList() {

        this.userTypeService.getUserDetails().subscribe(res => {
            console.log("Response received from the User service", res);
            if (res.status == 200) {

                this.userTypesList = res.data;
                this.userTypesList=this.userTypesList.filter(item =>item.user_role_id!='1');  

                if(this.users.user_company_id!=1)
                {
                this.userTypesList=this.userTypesList.filter(item =>item.user_company_id==this.users.user_company_id);                    
                }

                this.usertypesListTemp = [...res.data];
                console.log("Response is", res);

            } else {

                this.userTypesList = [];
                this.usertypesListTemp = [];
 
            }
        }, err => {          

            this.userTypesList = [];
            this.usertypesListTemp = [];
            console.log("An error occured", err);
             

        });
    }

       DeleteUser(id) {

        this.userTypeService.deleteUserType(id).subscribe(res => {
            console.log("Response received from the User type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> User Deleted Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center'
                 });
                this.getUserList();

            } else {
              console.log("User record is un-successfull!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
    }

}
