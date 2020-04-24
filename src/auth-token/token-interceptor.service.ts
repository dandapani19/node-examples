import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor } from '@angular/common/http';
import { ApiService } from "../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next){
    let authservice =this.injector.get(ApiService)
   let tokenizedReq = req.clone({
     setHeaders:{
       Authorization: `Bearer ${authservice.getToken()}`
     }
   })
   return next.handle(tokenizedReq)
  }
}
  