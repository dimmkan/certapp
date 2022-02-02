import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AuthService{

  set isAuth(value: boolean) {
    this._isAuth = value;
  }
  private _isAuth = false
  private isError = false
  userLogin = ''
  userPw = ''

  constructor(
    private cookie: CookieService,
    private router: Router,
    private http: HttpClient
  ) {
  }

  login(){

    this.http.post('http://nodecertapi.vybor.local:3000/users/auth',{
      login: this.userLogin,
      password: this.userPw
    })
      .subscribe(response =>{
        //@ts-ignore
        this._isAuth = response.isAuth
        if(this._isAuth){
          this.cookie.set('isAuth','true')
        }else{
          this.isError = true
        }
      })

  }

  logout(){
    this._isAuth = false
    this.isError = false
    this.cookie.deleteAll()
    this.router.navigate(['/'])
  }

  isAuthenticated() {
    return this._isAuth
  }

  isErrored(){
    return this.isError
  }
}
