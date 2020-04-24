import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UserRoleService } from "../../services/userRoleService";

import {Router} from "@angular/router";
@Component({
    selector: 'app-add-user-role',
    templateUrl: './addUserRole.component.html',
    styleUrls: ['./addUserRole.component.scss'],
    providers: [UserRoleService]
})
export class AddUserRoleComponent implements OnInit {

    userRoleCreationForm : FormGroup;

    constructor(
  	    private userRoleService: UserRoleService,  	
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router:Router
    ) { }
    
    ngOnInit() {
  	    console.log("Company type add component loaded!");
        this.initForm();                
    }  

    initForm() {
        this.userRoleCreationForm = this.formBuilder.group({
            user_role: ["", Validators.required]
        });
        console.log("User Role form ",this.userRoleCreationForm);
    }

    addUserRole() {

        console.log("Add Company Type called.");
        
        let newUserRole = {            
            user_role: this.userRoleCreationForm.controls["user_role"].value            
        }        

        this.userRoleService.addUserRole(newUserRole).subscribe(res => {
            console.log("Response received from the userRole.addUserRole service Method", res);
            if (res.status == 200) {                
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>User Role Added Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.router.navigate(['/user-role']);
            } else {
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>User Role Creation failed.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {          
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>User Role Creation failed.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
        });
    }    
}