import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbcRoutingModule } from './abc-routing.module';
import { AbcComponentComponent } from './abc-component/abc-component.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AbcComponentComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    AbcRoutingModule
  ]
})
export class AbcModule { }
