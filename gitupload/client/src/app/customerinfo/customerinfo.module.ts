import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';

import { CustomerinfoRoutingModule } from './customerinfo-routing.module';
import { VideosignatureModule } from '../videosignature/videosignature.module';

import { CustomerPolicyInfoComponent } from './customer-policy-info/customer-policy-info.component';

@NgModule({
  declarations: [CustomerPolicyInfoComponent],
  imports: [
    CommonModule,SignaturePadModule,
    CustomerinfoRoutingModule,
    ReactiveFormsModule,
    VideosignatureModule
  ]
})
export class CustomerinfoModule { }
