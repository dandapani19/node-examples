import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// LoginData:any;
  LoginData:any;


  constructor(
    public api: ApiService,
    public router: Router
  ) {
    this.LoginData={}
  }

  ngOnInit() {
  }

 signin(loginForm) {
 
    console.log("form data-----------",this.LoginData)

    this.api.UserLogin(this.LoginData).subscribe(data=>{
      if(data){
        console.log('----------.data',data)
        localStorage.setItem('token',data.token);
        this.router.navigate(['dashboard']);
      }
    }),
    err =>console.log(err)
 
  }

}
