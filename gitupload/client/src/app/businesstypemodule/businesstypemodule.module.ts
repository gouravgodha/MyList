import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinesstypemoduleRoutingModule } from './businesstypemodule-routing.module';
import { BusinessTypeAddComponent } from './business-type-add/business-type-add.component';
import { BusinessTypeComponent } from './business-type/business-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BusinessTypeUpdateComponent } from './business-type-update/business-type-update.component';
// import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BusinessTypeAddComponent, BusinessTypeComponent, BusinessTypeUpdateComponent],
  imports: [
    CommonModule,
    BusinesstypemoduleRoutingModule,
    ReactiveFormsModule
  ]
})
export class BusinesstypemoduleModule { }
