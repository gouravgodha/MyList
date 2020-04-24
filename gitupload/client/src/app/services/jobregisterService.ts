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
export class JobRegisterService {
  
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
             'enctype':'multipart/form-data',
           //  'Access-Control-Allow-Origin' : '*',
           // 'Access-Control-Allow-Headers': 'Content-Type'
             // 'Access-Control-Allow-Origin':'*'
             //  res.setHeader('Access-Control-Allow-Origin', '*');
        })
    }   

    getJobById(id):Observable<any> {
        const url = this.BASE_URL + 'joblist/job/' + id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

    getJobByIdforduplicate(id):Observable<any> {
        const url = this.BASE_URL + 'joblist/duplicate/' + id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     getCompanyJobById(company_id):Observable<any> {
        const url = this.BASE_URL + 'companyroute/listed/' + company_id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

    getJobList():Observable<any> {
        const url = this.BASE_URL + 'joblist';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }



     getHSalaryRange():Observable<any> {
        const url = this.BASE_URL + 'salary-range/range/hrange';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     getRegularSalaryRangeFrom(salary_range_from):Observable<any> {
        const url = this.BASE_URL + 'salary-range/salary_range_from_regular/' +  salary_range_from;;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


      getHourlySalaryRangeFrom(salary_range_from):Observable<any> {
        const url = this.BASE_URL + 'salary-range/salary_range_from_hourly/' +  salary_range_from;;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

      getRSalaryRange():Observable<any> {
        const url = this.BASE_URL + 'salary-range/range/rrange';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


     getDraftJobList():Observable<any> {
        const url = this.BASE_URL + 'joblist/draft';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


    getJobListApplyJobCount():Observable<any> {
        const url = this.BASE_URL + 'joblist/fetchjob/jobcount/';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }



    getExpireJobList():Observable<any> {
        const url = this.BASE_URL + 'joblist/expire/';
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


     getIndustryList():Observable<any> {
        const url = this.BASE_URL + 'category';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


     getSubIndustryList(industry_id):Observable<any> {
        const url = this.BASE_URL + 'category/' + industry_id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


    getSubIndustryListById(id):Observable<any> {
        const url = this.BASE_URL + 'category/subcat/' + id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }



     deleteJob(id):Observable<any> {
        const url = this.BASE_URL + `joblist/${id}` ;
        return this.http.delete(url,{ headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     AddJobList(addJob):Observable<any> {
        const url = this.BASE_URL + 'joblist';
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


      SearchJobListForDraft(serch_keyword):Observable<any> {
        const url = this.BASE_URL + 'joblist/draftsearch';
        console.log(serch_keyword);
        return this.http.post(url,serch_keyword, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


     SearchJobListForExpied(serch_keyword):Observable<any> {
        const url = this.BASE_URL + 'joblist/expiresearch';
        console.log(serch_keyword);
        return this.http.post(url,serch_keyword, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


    SearchJobListForWeb(serch_keyword):Observable<any> {
        const url = this.BASE_URL + 'joblist/searchforweb';
        console.log(serch_keyword);
        return this.http.post(url,serch_keyword, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


     SearchJobListForWebApi(serch_keyword):Observable<any> {
        const url = 'http://localhost/mylist/Careerjet_API/test.php';
        console.log(serch_keyword);
        return this.http.post(url,serch_keyword, { headers:this._headers1 })
         // return this.http.get(url, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


    updateJobList(editedEmployee):Observable<any> {
        const url = this.BASE_URL + 'joblist/updatejob';
        console.log("Data being sent", editedEmployee);
        return this.http.put(url,editedEmployee, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }
      
        
}
