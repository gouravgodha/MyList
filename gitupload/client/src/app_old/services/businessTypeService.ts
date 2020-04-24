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
export class BusinessTypeService {
  
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

    getBusinessType(business_type_id):Observable<any> {
        const url = this.BASE_URL + 'businessroute/fetchbusinesstype/' + business_type_id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

    getBusinessTypes():Observable<any> {
        const url = this.BASE_URL + 'businessroute/fetchbusinesstypes';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     deleteBusinessType(id):Observable<any> {
        const url = this.BASE_URL + `businessroute/deletebusinesstype/${id}` ;
        return this.http.delete(url,{ headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     addBusinessTypes(businesstype):Observable<any> {
        const url = this.BASE_URL + 'businessroute/createbusinesstype';
        console.log(businesstype);
        return this.http.post(url,businesstype, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


    updateBusinessTypes(updatebusinesstype):Observable<any> {
        const url = this.BASE_URL + 'businessroute/updatebusinesstype';
        console.log(updatebusinesstype);
        return this.http.post(url,updatebusinesstype, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }
      
        
}
