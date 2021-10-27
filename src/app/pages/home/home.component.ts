import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private cookieService: CookieService
  ) {

  }

  ngOnInit(): void {

  }

}
