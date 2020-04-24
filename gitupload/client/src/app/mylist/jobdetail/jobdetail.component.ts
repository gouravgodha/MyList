import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { JobRegisterService } from "../../services/jobregisterService";
// import { FormTypeService } from "../../services/formTypeService";
import { DataService } from "../../services/data.service";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
declare var $:any;
@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.scss'],
   providers: [
        JobRegisterService
    ]
})
export class JobdetailComponent implements OnInit {
id:any;
   searchForm : FormGroup;
    formTypeList: any = [];      
    emp_id: any;
    search_data: any;
	users:any;
  constructor(
   private sanitizer:DomSanitizer,
  	    private jobRegisterService: JobRegisterService,
  	    // private formTypeService: FormTypeService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router: Router,
         private DataService: DataService,
        private route: ActivatedRoute,

     ) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
  		this.getJObDetail(params['id']);
  		this.id = params['id'];
  	})



     $.getScript("assets/js/web/home.js");
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

getJObDetail(id){
	    	

        this.jobRegisterService.getJobById(id).subscribe(res => {
                console.log("Response received from the Job Register  service.", res);
                if (res.status == 200) {
                    console.log("Response is", res);
                    this.search_data = res.data;
                    //this.DataService.changeListState({list:res.data})
                   // this.searchForm.controls["home_location"].setValue(this.search_data.home_location);
                    // this.searchForm.controls["customer_document_filename"].setValue(this.search_data.customer_document_filename);
                } else {
                    console.log("JoB Search not found");
                    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Job, please try again..', '', {
                        timeOut: 2000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-error alert-with-icon",
                        positionClass: 'toast-top-center'
                    });
                }
            }, err => {
                console.log("An error occured", err);  
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Job Data, please try again..', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
        });
     }


}
