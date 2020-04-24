import { Component, OnInit } from '@angular/core';
import { UserTypeService } from "../../services/userService";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss'],
    providers: [UserTypeService]
})
export class ViewuserComponent implements OnInit {

   constructor(private userTypeService: UserTypeService,
    private toastr: ToastrService) { }
  	userTypesList: any = [];
	usertypesListTemp: any = [];	

  ngOnInit() {
  	// console.log("i am here!");
  	this.getUserList();
  }



  getUserList() {

        this.userTypeService.getUserDetails().subscribe(res => {
            console.log("Response received from the User service", res);
            if (res.status == 200) {

                this.userTypesList = res.data;
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
