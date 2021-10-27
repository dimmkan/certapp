import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "./services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  constructor(
    private cookieService: CookieService,
    public authService: AuthService
  ) {
    this.authService.isAuth = this.cookieService.check('isAuth');
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }
}
