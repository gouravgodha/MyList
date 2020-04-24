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
export class CompanyTypeService {
  
    private BASE_URL: string;
    _headers:any;
     _headers1:any;
    constructor(
        private http: HttpClient, 
        private _router: Router
    ) {
    
        this.BASE_URL = APIEndpoint2.BaseUrl;

        this._headers = new HttpHeaders({
            'authentication_token': 'eviden'
             // 'enctype':'multipart/form-data',
             // 'Content-Type':'multipart/form-data'
        })

         this._headers1 = new HttpHeaders({
            'authentication_token': 'eviden',
             'enctype':'multipart/form-data'
             // 'Content-Type':'multipart/form-data'
        })
    }   

    getCompanyType(company_id):Observable<any> {
        const url = this.BASE_URL + 'companyroute/fetchcompanydetail/' + company_id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

    getCompanyDetails():Observable<any> {
        const url = this.BASE_URL + 'companyroute/getcompanydetails';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


   getCompanyDetailss():Observable<any> {
        const url = this.BASE_URL + 'companyroute/getcompanydetailss';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


     getCompanyListed():Observable<any> {
        const url = this.BASE_URL + 'companyroute/listed';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


     deleteCompanyType(id):Observable<any> {
        const url = this.BASE_URL + `companyroute/deletecompany/${id}` ;
        return this.http.delete(url,{ headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     addcompanyTypes(formdata):Observable<any> {
        const url = this.BASE_URL + 'companyroute/createcompany';
        console.log(formdata);
        return this.http.post(url,formdata, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


    updateCompanyTypes(updateformtype):Observable<any> {
        const url = this.BASE_URL + 'companyroute/updatecompanydetail';
        console.log("Data being sent", updateformtype);
        return this.http.post(url,updateformtype, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }
      
        
}
