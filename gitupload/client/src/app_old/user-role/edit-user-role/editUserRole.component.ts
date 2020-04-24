import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { UserRoleService } from "../../services/userRoleService";

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-edit-user-role',
    templateUrl: './editUserRole.component.html',
    styleUrls: ['./editUserRole.component.scss'],
    providers: [ UserRoleService ]
})
export class EditUserRoleComponent implements OnInit {

    userRoleEditForm: FormGroup;
    userRole: any;	
	user_role_id: any;		

    constructor(
        private route: ActivatedRoute,
	 	private userRoleService: UserRoleService,
	 	private toastr: ToastrService,  	 	
	 	private formBuilder: FormBuilder,
        private router: Router
    ){}

    ngOnInit() {
        this.initEditForm();
  	    this.route.params.subscribe(params => {            
            this.getUserRole(params['id']);
            this.user_role_id = params['id'];            
        });
    }

    initEditForm() {
        this.userRoleEditForm = this.formBuilder.group({
            user_role: ["", Validators.required]
        });        
    }

    getUserRole(user_role_id) {
  	    this.userRoleService.getUserRole(user_role_id).subscribe(res => {
            console.log("Response received from the userRoleService.getUserRole method ", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.userRole = res.data;
                this.userRoleEditForm.controls["user_role"].setValue(this.userRole.user_role);
            } else {
                console.log("Form type not added successfully!");
            }
        }, err => {          
            console.log("An error occured", err);
        });
    }    

    editUserRole() {

        console.log("Update User Role called.");
        
        let updatedUserRole = {
            user_role_id: this.user_role_id,
            user_role: this.userRoleEditForm.controls["user_role"].value
        }                

        this.userRoleService.updateUserRole(updatedUserRole).subscribe(res => {
            console.log("Response received from the company type service", res);
            if (res.status == 200) {                   
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Company Type Updated Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center' 
                });
                this.router.navigate(['/user-role']);
            } else {
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Company Type Update failed.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center' 
                });
            }
        }, err => {          
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Company Type Update failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-success alert-with-icon",
                positionClass: 'toast-top-center' 
            });
        });
    }    
}