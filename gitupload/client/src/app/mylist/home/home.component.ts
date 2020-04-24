import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CompanyTypeService } from "../../services/companyService";
// import { HeaderComponent } from "../header/header.component";
import { JobBoardService } from "../../services/jobboardService";
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
   providers: [CompanyTypeService,JobBoardService]
})


export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private jobBoardService: JobBoardService,private companyTypeService: CompanyTypeService) { }

  ngAfterViewInit(){
   // $('#owl-testi').owlCarousel('destroy');
    
    // $('#owl-testi').trigger('destroy.owl.carousel');
    setTimeout(()=>{

    $("#owl-testi").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items: 5,
        nav: true,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3]
    });

    },1000);
  }

  companylist: any=[];
  jobboard_section: any=[];
  ngOnInit() {


    this.jobBoardService.getJobBoardSection().subscribe(res => {
        console.log("list data is", res.data);
      this.jobboard_section = res.data;
      console.log("job board section is=>", this.jobboard_section);
     });


     this.companyTypeService.getCompanyListed().subscribe(res => {

      console.log("list data is", res.data);
      this.companylist = res.data;
     });


  	 // $.getScript("assets/js/web/home.js");
  	// $.getScript( "assets/js/main.min.js");


  	 (function() {
         var $body = document.body
         , $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];
         
         if ( typeof $menu_trigger !== 'undefined' ) {
         $menu_trigger.addEventListener('click', function() {
             $body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
         });
         }
         
         }).call(this);
  }

}
