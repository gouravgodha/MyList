import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { APIEndpoint } from '../appsettings/BaseUrl';
 import {EncryptionService} from './encryption.service';


@Injectable()
export class AuthService {
  
  private BASE_URL: string;
  _headers:any;
  constructor(private http:HttpClient, private _router:Router,private EncryptionService:EncryptionService) {
    this.BASE_URL = APIEndpoint.BaseUrl;
    this._headers= new HttpHeaders({
    'Client-Service': 'LRL2018SH',
    'Auth-Key': '5ccd7b534b19d30030c6503f3a852d00',
    'Content-Type': 'application/json'
  })


  }

  LoginAuth(data):Observable<any>{
    
    const url = this.BASE_URL + 'apanellogin';
    return this.http.post(url,data,{headers:this._headers}).map(res=>res);
  }

  LogOut()
  {
    
  	localStorage.clear();
    this._router.navigate(['auth/login']);
  }


  DashboardService():Observable<any>
  {
      let url= this.BASE_URL+'dashboard'
      var db_name=this.EncryptionService.DecryptText(localStorage.getItem('db_name'));
      return this.http.post(url,{db_name:db_name},{headers:this._headers}).map(res=>res).catch((e:any)=>{
        return Observable.throw(e);
      });
  }
}
