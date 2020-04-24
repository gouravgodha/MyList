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
export class JobBoardService {
  
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

    getJobBoardSectionById(id):Observable<any> {
        const url = this.BASE_URL + 'jobboard_section/' + id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     getJobApplyListById(id):Observable<any> {
        const url = this.BASE_URL + 'applyedjob/' + id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

    getJobBoardSection():Observable<any> {
        const url = this.BASE_URL + 'jobboard_section';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


    getJobApplyListByFilter(data):Observable<any> {
        const url = this.BASE_URL + 'applyedjob';
        console.log(data);
        return this.http.post(url,data, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

    getJobApplyListByFilterbycompany(data):Observable<any> {
        const url = this.BASE_URL + 'applyedjob/bycompany';
        console.log(data);
        return this.http.post(url,data, { headers:this._headers1 })
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


     deleteJobBoardSection(id):Observable<any> {
        const url = this.BASE_URL + `jobboard_section/${id}` ;
        return this.http.delete(url,{ headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     addJobBoardSection(addJob):Observable<any> {
        const url = this.BASE_URL + 'jobboard_section';
        console.log(addJob);
        return this.http.post(url,addJob, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


     ApplyForJob(data):Observable<any> {
        const url = this.BASE_URL + 'joblist/applyjob';
        console.log(data);
        return this.http.post(url,data, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


     SearchJobList(serch_keyword):Observable<any> {
        const url = this.BASE_URL + 'joblist/search';
        console.log(serch_keyword);
        return this.http.post(url,serch_keyword, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


    updateJobList(editedEmployee):Observable<any> {
        const url = this.BASE_URL + 'jobboard_section';
        console.log("Data being sent", editedEmployee);
        return this.http.put(url,editedEmployee, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }
      
        
}
