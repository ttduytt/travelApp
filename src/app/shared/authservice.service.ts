import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient) { }

  private token = 'accessToken';

  setToken(token:string): void{
    localStorage.setItem(this.token, token)
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  removeToken(): void {
    localStorage.removeItem(this.token);
  }

  // refreshtoken
  refreshToken(url:string): Observable<string>{
    return this.http.get<string>(url, { withCredentials: true })
  }
}
