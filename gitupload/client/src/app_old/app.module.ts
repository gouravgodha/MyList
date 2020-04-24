import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuardService } from './services/authGuard.service';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AuthService } from './services/auth.service';
import { EncryptionService } from './services/encryption.service';
import { BusinessTypeService } from "./services/businessTypeService";
import { DataService } from "./services/data.service";


import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BusinessTypeComponent } from './businesstypemodule/business-type/business-type.component';
import { CustomerinfoModule } from './customerinfo/customerinfo.module';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    AuthenticationModule,
    CustomerinfoModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [BusinessTypeService,AuthGuardService,DataService,AuthService,EncryptionService,{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
