import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-jobapply',
  templateUrl: './jobapply.component.html',
  styleUrls: ['./jobapply.component.scss']
})
export class JobapplyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
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

}
