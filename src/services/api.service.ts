import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient,private router:Router){}
   
  UserLogin(body): Observable<any>{
    return this.httpClient.post(this.API_URL+'/user/login',body);
  }
  CreateUser(body): Observable<any>{
    return this.httpClient.post(this.API_URL+'/user/signup',body);
  }
  CreateOrder(body): Observable<any>{
    return this.httpClient.post(this.API_URL+'/order',body);
  }
  Creatediary(body): Observable<any>{
    return this.httpClient.post(this.API_URL+'/diary',body);
  }

  getToken(){
    return localStorage.getItem('token');
  }
  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }
}
