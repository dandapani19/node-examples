import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { DiaryComponent } from './diary/diary.component';

import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { TokenInterceptorService } from '../auth-token/token-interceptor.service';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
{ path: "",component: LoginComponent},
{ path: "login",component: LoginComponent},
{ path: "signup",component: SignupComponent},
{ path: "dashboard",component: DashboardComponent},
{ path: "diary",component: DiaryComponent},
{ path: "order",component: OrderComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    OrderComponent,
    DiaryComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,RouterModule.forRoot(routes)
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
