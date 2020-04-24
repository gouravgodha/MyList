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
export class CustomerService {
  
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


     uploadSignature(signatureData): Observable<any> {
        console.log("The signature data that will be sent forward is", signatureData);
        const url = this.BASE_URL + 'admin/signature_upload';
        return this.http.post(url, signatureData, { headers:this.standardHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }

    getCustomer(customer_id) : Observable<any> {
        const url = this.BASE_URL + `customer/${customer_id}`;
        return this.http.get(url, { headers : this.standardHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }

    getCustomers() : Observable<any> {
        const url = this.BASE_URL + 'customer/';
        return this.http.get(url, { headers : this.standardHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }

    deleteCustomer(customer_id) : Observable<any> {
        const url = this.BASE_URL + `customer/${customer_id}` ;
        return this.http.delete(url, { headers : this.standardHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }

    addCustomer(newCustomer) : Observable<any> {
        const url = this.BASE_URL + 'customer/';
        console.log("New Customer received in the service is", newCustomer);
        return this.http.post(url, newCustomer, { headers : this.formDataHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }

    updateCustomer(updatedCustomer) : Observable<any> {
        const url = this.BASE_URL + 'customer/';
        console.log("Updated Customer received in the service", updatedCustomer);
        return this.http.put(url, updatedCustomer, { headers : this.standardHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }  

        updateCustomerinfo(updatedCustomerinfo) : Observable<any> {
        const url = this.BASE_URL + 'customer/customerinfo';
        console.log("Updated Customerinfo received in the service", updatedCustomerinfo);
        return this.http.put(url, updatedCustomerinfo, { headers : this.standardHeaders })
            .map(res => res)
            .catch((e : any) => {
                return Observable.throw(e);
            });
    }  


}