import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormtypeRoutingModule } from './formtype-routing.module';
import { FormtypecomponentComponent } from './formtypecomponent/formtypecomponent.component';
import { AddformtypecomponentComponent } from './addformtypecomponent/addformtypecomponent.component';
import { UpdatefromtypeComponent } from './updatefromtype/updatefromtype.component';

@NgModule({
  declarations: [FormtypecomponentComponent, AddformtypecomponentComponent, UpdatefromtypeComponent],
  imports: [
    CommonModule,
    FormtypeRoutingModule,
    ReactiveFormsModule
  ]
})
export class FormtypeModule { }
