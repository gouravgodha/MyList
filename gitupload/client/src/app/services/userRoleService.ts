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
export class UserRoleService {
  
    private BASE_URL: string;
    standardHeaders : any;
    formDataHeaders : any;
    
    constructor(
        private http: HttpClient,
        private _router: Router
    ) {
    
        this.BASE_URL = APIEndpoint2.BaseUrl;

        this.standardHeaders = new HttpHeaders({
            'authentication_token': 'eviden'
            // 'enctype':'multipart/form-data',
            // 'Content-Type':'multipart/form-data'
        })

        this.formDataHeaders = new HttpHeaders({
            'authentication_token': 'eviden',
            'enctype':'multipart/form-data'
            // 'Content-Type':'multipart/form-data'
        })
    }

    getUserRole(user_role_id) : Observable<any> {
        const url = this.BASE_URL + `user-role/${user_role_id}`;
        return this.http.get(url, { headers:this.standardHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }

    getUserRoles() : Observable<any> {
        const url = this.BASE_URL + 'user-role/';
        return this.http.get(url, { headers:this.standardHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }

    deleteUserRole(user_role_id) : Observable<any> {
        const url = this.BASE_URL + `user-role/${user_role_id}`;
        return this.http.delete(url, { headers:this.standardHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }

    addUserRole(newUserRole) : Observable<any> {
        const url = this.BASE_URL + 'user-role/';
        console.log("New User Role received in the service is", newUserRole);
        return this.http.post(url, newUserRole, { headers:this.formDataHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }

    updateUserRole(updatedUserRole) : Observable<any> {
        const url = this.BASE_URL + 'user-role/';
        console.log("Updated User Role received in the service", updatedUserRole);
        return this.http.put(url, updatedUserRole, { headers:this.standardHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }
}