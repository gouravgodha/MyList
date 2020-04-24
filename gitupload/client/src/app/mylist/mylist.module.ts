import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MylistRoutingModule } from './mylist-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployersComponent } from './employers/employers.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployersHeaderComponent } from './employers-header/employers-header.component';
import { EmployeeFooterComponent } from './employee-footer/employee-footer.component';
import { SearchjobComponent } from './searchjob/searchjob.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import {CarouselModule} from "ngx-carousel-lib";
import { CompanyjobComponent } from './companyjob/companyjob.component';
import { JobapplyComponent } from './jobapply/jobapply.component';
import { HomeapiComponent } from './homeapi/homeapi.component';
import { LandingHederComponent } from './landing-heder/landing-heder.component';

@NgModule({
  declarations: [
  HomeComponent, 
  HeaderComponent, 
  FooterComponent, DashboardComponent, EmployersComponent, EmployeeComponent, EmployersHeaderComponent, EmployeeFooterComponent, SearchjobComponent, JobdetailComponent, CompanyjobComponent, JobapplyComponent, HomeapiComponent, LandingHederComponent
  ],
  imports: [
    CommonModule,
    MylistRoutingModule,
    ReactiveFormsModule,
    CarouselModule
  ]
})
export class MylistModule { }
