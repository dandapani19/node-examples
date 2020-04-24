import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

 public DiaryData:any;
  constructor(
    public api: ApiService,
    public router: Router
  ) { this.DiaryData={}}

  ngOnInit(): void {
  }

  diarySave(){
    console.log(this.DiaryData)
    this.api.Creatediary(this.DiaryData).subscribe(data=>{
      if(data){
        console.log('----------.data',data)
        this.router.navigate(['dashboard']);
      }
    }),
    err => console.log(err);
  }
}
