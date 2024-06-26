import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../shared/model/postModel';
import { Observable } from 'rxjs';
import { User } from '../shared/model/userModel';
import { poinRating } from '../shared/model/poinRatingModel';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http: HttpClient) { }

  // lấy bài viết loaiju place

  getTypePost (url:string): Observable<[Post]>{
    return this.http.get<[Post]>(url)
  }

  getOnePost (url:string): Observable<Post>{
    return this.http.get<Post>(url)
  }

  updateView(url:string):Observable<Post>{
    return this.http.put<Post>(url,{})
  }

  getPostViewhigh(url:string):Observable<[Post]>{
    return this.http.get<[Post]>(url)
  }

  dynamicSearch(url:string, data:{}):Observable<[Post]>{
    return this.http.post<[Post]>(url, data)
  }

    // thêm user
   
  addUser (url:string, user:User): Observable<User>{
        return this.http.post<User> (url, user) 
    }

  login(url:string, data:any):Observable<any> {
    return this.http.post<any> (url, data,{ withCredentials: true } ) 
  }

  addpoinRating (url:string, data:poinRating, token:string): Observable<poinRating>{
    const httpOptions = {
      headers : new HttpHeaders({
        'authorization': 'Bearer ' + token
      })
    }
    return this.http.post<poinRating>(url, data, httpOptions)
  }
  
}
