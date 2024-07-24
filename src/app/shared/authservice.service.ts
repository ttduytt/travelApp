import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient) { }

  private token = 'accessToken';

  setToken(token:string): void{
    sessionStorage.setItem(this.token, token)
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.token);
  }

  removeAccessToken(): void {
    sessionStorage.removeItem(this.token);
  }

  // refreshtoken
  refreshToken(url:string): Observable<string>{
    return this.http.get<string>(url, { withCredentials: true })
  }

  checkIsAdmin(url:string, token:any): Observable<boolean>{
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + token
      }),
    };
    return this.http.get<boolean>(url, httpOptions)
  }

    // Phương thức để lưu biến vào cookie
    saveToCookie(value :string) {
      Cookies.set('ckuserlogin', value);
    }

    readFromCookie(): string | null {
      return Cookies.get('ckuserlogin') || null;
    }

   removeCookie() {
      Cookies.remove('ckuserlogin')
    }
  
}
