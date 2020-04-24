import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  OrderData:any;
  constructor(
    public router: Router
  ) {}
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if(!token){
       this.router.navigate(['login'])
    }
  }


}
