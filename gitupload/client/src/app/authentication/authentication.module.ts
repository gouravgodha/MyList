import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';
import { BlankComponent } from '../blank/blank.component';



import { AuthenticationRoutes } from './authentication.routing';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [ 
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent,
    BlankComponent
    

  ]
})

export class AuthenticationModule {}
