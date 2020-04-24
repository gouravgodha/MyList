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
export class UserTypeService {
  
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

    getUser(user_id):Observable<any> {
        const url = this.BASE_URL + 'user/' + user_id;
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

    getUserDetails():Observable<any> {
        const url = this.BASE_URL + 'user';
        return this.http.get(url, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     deleteUserType(id):Observable<any> {
        const url = this.BASE_URL + `user/${id}` ;
        return this.http.delete(url,{ headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }

     adduserTypes(formdata):Observable<any> {
        const url = this.BASE_URL + 'user';
        console.log(formdata);
        return this.http.post(url,formdata, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }


       getloginData(data):Observable<any> {
        const url = this.BASE_URL + 'user/login';
        console.log(data);
        return this.http.post(url,data, { headers:this._headers1 })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }



    updateUserTypes(updateformtype):Observable<any> {
        const url = this.BASE_URL + 'user';
        console.log("Data being sent", updateformtype);
        return this.http.put(url,updateformtype, { headers:this._headers })
            .map(res=>res)
            .catch((e:any)=>{
                return Observable.throw(e);
            });
    }
  
      uploadVideo(videoData): Observable<any> {
        console.log("The video data that will be sent forward is", videoData);
        const url = this.BASE_URL + 'admin/video_upload';
        return this.http.post(url, videoData, { headers:this._headers1 })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }
        
}
