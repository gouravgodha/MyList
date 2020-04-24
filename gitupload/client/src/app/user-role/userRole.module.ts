import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoleRoutingModule } from './userRole-routing.module';

import { ViewUserRoleComponent } from './view-user-role/viewUserRole.component';
import { AddUserRoleComponent } from './add-user-role/addUserRole.component';
import { EditUserRoleComponent } from './edit-user-role/editUserRole.component';

@NgModule({
    declarations: [
        ViewUserRoleComponent, 
        AddUserRoleComponent, 
        EditUserRoleComponent
    ],
    imports: [
        CommonModule,
        UserRoleRoutingModule,
        ReactiveFormsModule
    ]
})

export class UserRoleModule { }