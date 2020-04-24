import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  OrderData:any;
  constructor(
    public api: ApiService,
    public router: Router
  ) { this.OrderData={}}

  ngOnInit(): void {
  }

  order(diaryForm){
    console.log(this.OrderData)
    this.api.CreateOrder(this.OrderData).subscribe(data=>{
      if(data){
        console.log('----------.data',data)
        this.router.navigate(['dashboard']);
      }
    }),
    err => console.log(err);
  }
}
