import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { APIEndpoint } from '../appsettings/BaseUrl';
import { APIEndpoint2 } from '../appsettings/BaseUrl';


@Injectable()
export class FormTypeService {
  
    private BASE_URL: string;
    _headers:any;
    constructor(
        private http: HttpClient, 
        private _router: Router
    ) {
    
        this.BASE_URL = APIEndpoint2.BaseUrl;

        this._headers = new HttpHeaders({
            'authentication_token': 'eviden'
        })
    }   

    getFormType(form_id):Observable<any> {
        const url = this.BASE_URL + 'formtyperoute/fetchformtype/' + form_id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

    getFormTypes():Observable<any> {
        const url = this.BASE_URL + 'formtyperoute/fetchformtypes';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     deleteFormType(id):Observable<any> {
        const url = this.BASE_URL + `formtyperoute/deleteformtype/${id}` ;
        return this.http.delete(url,{ headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     addformTypes(formdata):Observable<any> {
        const url = this.BASE_URL + 'formtyperoute/createformtype';
        console.log(formdata);
        return this.http.post(url,formdata, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


    updateFormTypes(updateformtype):Observable<any> {
        const url = this.BASE_URL + 'formtyperoute/updateformtype';
        console.log(updateformtype);
        return this.http.post(url,updateformtype, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }
      
        
}
