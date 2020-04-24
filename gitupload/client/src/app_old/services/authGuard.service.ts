import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {EncryptionService} from './encryption.service';

const permissions = {
  'Admin': [
    'user',
    'user-role',
    'customer',
    'formtype',
    'businesstype',
    'company',
    'video-capture'
  ],
  'Agent': [
    'customer'
  ],

}

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(public router: Router,
  	private EncryptionService:EncryptionService
  	) {}

  checkAuthorization(url, userRole): Boolean {

      if(permissions[userRole].includes(url))
        return true;
    
      return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {

  		
    let status = this.EncryptionService.DecryptText(localStorage.getItem('loginStatus'));

    if (status != "Loggedin")  {

      this.router.navigate(['/auth/login']);
      return false;
    } 
    return true;
    // return true;
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {

  	console.log("Canactiveted child actived!", state.url.slice(1));


  	
    //user_roll = user

    let status = this.EncryptionService.DecryptText(localStorage.getItem('loginStatus'));
    let user_role = this.EncryptionService.DecryptText(localStorage.getItem('user_role'));
console.log("Your role is",user_role);
    if (status != "Loggedin") {

      this.router.navigate(['/auth/login']);
      return false;
    } 

    // if(!this.checkAuthorization(state.url.slice(1), user_role)){
    //   return false
    // }

    return true;
    
  }


}
