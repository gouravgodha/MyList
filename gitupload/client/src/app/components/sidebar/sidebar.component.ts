import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
     // { path: '/jobregister/add', title: 'Create New Job',  icon: 'files_paper', class: '' },
    { path: '/businesstype', title: 'Business Type',  icon: 'business_badge', class: 'BusinessTypeComponent' },
    { path: '/company', title: 'Company',  icon: 'design_bullet-list-67', class: '' },
    { path: '/user-role', title: 'User Role',  icon: 'design_app', class: '' },
    { path: '/user', title: 'Company User',  icon: 'users_single-02', class: '' },
   //// { path: '/customer', title: 'Customer',  icon: 'text_caps-small', class: '' },
   // { path: '/formtype', title: 'Form Type',  icon: 'files_paper', class: '' },
    { path: '/jobseeker', title: 'Job Seeker',  icon: 'files_paper', class: '' },
    { path: '/jobregister', title: 'Active Jobs',  icon: 'files_paper', class: '' },

    { path: '/draft', title: 'Draft Jobs',  icon: 'files_paper', class: '' },

    { path: '/expiredjobs', title: 'Expired Jobs',  icon: 'files_paper', class: '' },
    { path: '/job-apply', title: 'Candidates',  icon: 'files_paper', class: '' },
    // { path: '/ex-job-apply', title: 'Expired Candidates',  icon: 'files_paper', class: '' },
    { path: '/shortlist', title: 'Shortlist',  icon: 'files_paper', class: '' },
     { path: '/job-board', title: 'Job Board Section',  icon: 'files_paper', class: '' }
     // { path: '/jobregister/add', title: 'Create New Job',  icon: 'files_paper', class: '' }
    // { path: '/customerinfo/2', title: 'Evidence',  icon: 'text_caps-small', class: '' }
    // { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' }
    // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

    // { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];
import { DataService } from "../../services/data.service";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  users:any;
  logo_url:string;
  constructor(private DataService:DataService) {

  this.DataService.getUserState().subscribe(data=>{
       this.users=data;
       this.logo_url=this.users.logo_url;
       }) 
    
      if(localStorage.getItem('users')!=null && localStorage.getItem('users')!=undefined)
      {
       this.users=JSON.parse(localStorage.getItem('users')); 
      this.logo_url=this.users.logo_url;
     // this.logo_url=this.users.logo_url;
      }
if(this.users.user_company_id==1 && this.users.user_role_id==1){
this.menuItems = ROUTES.filter(menuItem => menuItem.path=='/businesstype' || menuItem.path=='/company' || menuItem.path=='/user-role' || menuItem.path=='/user' || menuItem.path=='/customer' || menuItem.path=='/formtype' || menuItem.path=='/jobseeker' || menuItem.path=='/jobregister' || menuItem.path=='/draft'  || menuItem.path=='/expiredjobs' || menuItem.path=='/job-apply' ||  menuItem.path=='/shortlist' || menuItem.path=='/job-board');
}else{
  this.menuItems = ROUTES.filter(menuItem=>menuItem.path=='/user' || menuItem.path=='/customer' || menuItem.path=='/formtype' || menuItem.path=='/job-apply'  || menuItem.path=='/shortlist'  || menuItem.path=='/jobregister' || menuItem.path=='/draft' || menuItem.path=='/expiredjobs');
}

   }

  ngOnInit() {
  //  this.menuItems = ROUTES.filter(menuItem => menuItem.path=='/businesstype' || menuItem.path=='/company' || menuItem.path=='/user-role' || menuItem.path=='/user' || menuItem.path=='/customer' || menuItem.path=='/formtype');

//    this.menuItems = ROUTES.filter(menuItem => menuItem.path=='/businesstype' || menuItem.path=='/company' || menuItem.path=='/user-role' || menuItem.path=='/user' || menuItem.path=='/customer' || menuItem.path=='/formtype');
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
