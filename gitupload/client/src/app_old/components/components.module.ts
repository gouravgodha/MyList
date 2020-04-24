import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbdModalContent } from './prompt/prompt.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NgbdModalContent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NgbdModalContent
  ],
  entryComponents:[
    NgbdModalContent
  ]
})
export class ComponentsModule { }
