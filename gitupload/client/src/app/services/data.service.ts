import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject"

@Injectable()
export class DataService {
  private userstate$ = new BehaviorSubject<any>({
  	users:{
          user_id:null,
  		   user_role_id:null,
         user_company_id:null,
  		   user_first_name:null,
  		   user_last_name:null,
  		   user_email:null,
  		   company_name:'Eviden',
  		   logo_url:"assets/img/eviden.png"

  		}});
  userstate=this.userstate$.asObservable();

   private liststate$ = new BehaviorSubject<any>({
    list:[]});
  //userstate=this.userstate$.asObservable();
  liststate=this.liststate$.asObservable();
  constructor() { 
  }
  changeUserState(myChange) {this.userstate$.next(myChange);}
  getUserState() {return this.userstate$.asObservable();}

  changeListState(myChange) {this.liststate$.next(myChange);}
  getListState() {return this.liststate$.asObservable();}

  // userData : any = {
    
  // }

  // searchResults:any = [];

  // setSearchResults(results){
  //   console.log("Search results are to be set", results);
  //   this.searchResults.length = 0;
  //   this.searchResults = [...results];  
  // }

  // getSearchResults(){
  //   console.log("The search results have been requested", this.searchResults);
  //   return this.searchResults;
  // }

  // setUserData(userData){
  //   console.log("User data changed", userData);
  //   this.userData = {
  //   };
  //   this.userData = {
  //     ...userData
  //   }

  // }

  //   getUserData(){
  //     console.log("The user data has been requested", this.userData);
  //     return this.userData;
  //   }
}
