import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserTypeService } from '../../services/userService';
import { DataService } from "../../services/data.service";
import { EncryptionService } from '../../services/encryption.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [EncryptionService,UserTypeService]

})
export class LoginComponent implements OnInit, AfterViewInit {
  LoginForm: FormGroup;
  constructor(public router: Router,
    private AuthService: AuthService,
    private userTypeService: UserTypeService,
    private EncryptionService: EncryptionService,
    private DataService: DataService,
    private fb: FormBuilder
  ) {
    var status = this.EncryptionService.DecryptText(localStorage.getItem('loginStatus'));

    if (status == "Loggedin") {
     this.router.navigate(['/businesstype']);
    }

    

  }

  ngOnInit() {
this.LoginFormInit();
//this.LoadYearList();
}

ngAfterViewInit() {
  // $(function() {
  //   $(".preloader").fadeOut();
  // });
  // $(function() {
  //   ( < any > $('[data-toggle="tooltip"]')).tooltip()
  // });
  // $('#to-recover').on("click", function() {
  //   $("#loginform").slideUp();
  //   $("#recoverform").fadeIn();
  // });
}



UserData: any = [];
ErrorMsg: boolean = false;

// Login authentication
LoginAuth(formData) {
  let data = {
    'user_email': formData.value.user_email,
    'user_password': formData.value.password
  };
  console.log("login data is",data);

  // this.LoginFormInit();
  this.userTypeService.getloginData(data).subscribe(res => {
    console.log("Responce log is",res);
    if (res.status == 200) {

// if(formData.value.user_email=="admin@gmail.com" && formData.value.password=="123"){
//       localStorage.setItem('loginStatus', this.EncryptionService.EncryptText('Loggedin'));
//       localStorage.setItem('user_id',"123");
//        this.router.navigate(['/businesstype']);
// }
     localStorage.setItem('loginStatus', this.EncryptionService.EncryptText('Loggedin'));
     localStorage.setItem('user_role',this.EncryptionService.EncryptText(res.data.user_roles_master.user_role));
     var users={user_id:res.data.user_id,
                user_role_id:res.data.user_role_id,
                user_company_id:res.data.user_company_id,
                user_first_name:res.data.user_first_name,
                user_last_name:res.data.user_last_name,
                user_email:res.data.user_email,
                company_name:res.data.company_master.company_name,
                logo_url:res.data.company_master.company_logo==''?"assets/img/eviden.png":res.data.company_master.company_logo
              };
     localStorage.setItem('users',JSON.stringify(users));
     this.DataService.changeUserState(users)
     if(users.user_company_id==1){
      this.router.navigate(['/businesstype']);
      }else{
        this.router.navigate(['/user']);
      }

    } else {
      this.ErrorMsg = true;
      setTimeout(() => { this.ErrorMsg = false; }, 3000);


    }
  }, err => {
    this.ErrorMsg = true;
    setTimeout(() => { this.ErrorMsg = false; }, 3000);


  });
}

// Set Login From

LoginFormInit() {
  this.LoginForm = this.fb.group({
    user_email:["", Validators.compose([Validators.required,Validators.email])],
    password: ['', Validators.compose([Validators.required])]
    
  });
}


}
