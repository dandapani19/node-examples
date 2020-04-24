import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
SignupData:any;
  constructor(
    public api: ApiService,
    public router: Router
  ) { this.SignupData={}}

  ngOnInit(): void {
  }
  signup(signupForm){
    console.log(this.SignupData)
    
    this.api.CreateUser(this.SignupData).subscribe(data=>{
      if(data){
        console.log('----------.data',data)
        localStorage.setItem('token',data.token);
        this.router.navigate(['dashboard']);
      }
    }),
    err => console.log(err);

  }

}
