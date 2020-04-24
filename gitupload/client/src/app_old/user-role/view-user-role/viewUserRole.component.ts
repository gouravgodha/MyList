import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UserRoleService } from "../../services/userRoleService";

@Component({
    selector: 'app-view-user-role',
    templateUrl: './viewUserRole.component.html',
    styleUrls: ['./viewUserRole.component.scss'],
    providers: [UserRoleService]
})
export class ViewUserRoleComponent implements OnInit {

    userRoleList: any = [];    

    constructor(
        private userRoleService: UserRoleService,
        private toastr: ToastrService
    ){}
                  
    ngOnInit() {
      	console.log("View User Role initialized");
  	    this.getUserRoles();
    }

    getUserRoles() {
        this.userRoleService.getUserRoles().subscribe(res => {
            console.log("Response received from the userRoleService.getUserRoles method", res);
            if (res.status == 200) {
                this.userRoleList = res.data;
            } else {
                this.userRoleList = [];                 
            }
        }, err => {
            this.userRoleList = [];            
            console.log("An error occured", err);
        });
    }

    deleteUserRole(user_role_id) {

        this.userRoleService.deleteUserRole(user_role_id).subscribe(res => {
            console.log("Response received from the User Role service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> User Role Deleted Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.getUserRoles();
            } else {
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> User Role Delete Failed..', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {
            console.log("An error occured", err);
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> User Role Delete Failed..', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
        });
    }

}
