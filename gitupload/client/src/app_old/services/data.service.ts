import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject"

@Injectable()
export class DataService {
  private userstate$ = new BehaviorSubject<any>({users:{user_id:null,user_role_id:null,user_first_name:null,user_last_name:null,user_email:null}});
  userstate=this.userstate$.asObservable();
  constructor() { 
  }
  changeUserState(myChange) {this.userstate$.next(myChange);}
  getUserState() {return this.userstate$.asObservable();}

}
