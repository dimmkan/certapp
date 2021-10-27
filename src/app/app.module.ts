import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { EdsComponent } from './pages/eds/eds.component';
import { EdsItemComponent } from './pages/eds-item/eds-item.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from "ngx-pagination";
import {FilterPipeModule} from "ngx-filter-pipe";
import {CookieService} from "ngx-cookie-service";
import { KktComponent } from './pages/kkt/kkt.component';
import { KktItemComponent } from './pages/kkt-item/kkt-item.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    EdsComponent,
    EdsItemComponent,
    HomeComponent,
    KktComponent,
    KktItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    FilterPipeModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
