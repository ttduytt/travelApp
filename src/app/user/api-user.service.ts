import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../shared/model/postModel';
import { Observable } from 'rxjs';
import { User } from '../shared/model/userModel';
import { poinRating } from '../shared/model/poinRatingModel';
import { PendingPost } from '../shared/model/pendingPost';

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

  updateView(url:string):Observable<any>{
    return this.http.put<any>(url,{})
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

  getSuggestPost(url:string, id:string):Observable<[Post]>{
    return this.http.get<[Post]>(`${url}/${id}`)
  }

  getRating(url:string): Observable<any>{
    return this.http.get<any>(url)
  }

  getRatingWithLogin(url:string, token:string):Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders({
        'authorization': 'Bearer ' + token
      })
    }
    return this.http.get<any>(url,httpOptions)
  }

  getPostByKeyWord(url: string, keyWord:string):Observable<[Post]>{
    return this.http.get<[Post]>(url+keyWord)
  }

  verifyUser (url: string, token:string):Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders({
        'authorization': 'Bearer ' + token
      })
    }
   return this.http.get<any>(url, httpOptions)
  }

  subriceService(url:string , data:PendingPost):Observable<any>{
    return this.http.post<any>(url, data)
  }

  getServiceByType (url :string):Observable<[PendingPost]>{
    return this.http.get<[PendingPost]>(url)
  }

  updateLike(url:string):Observable<any>{
    return this.http.put(url, {})
  }

  deleteRating(url:string):Observable<any>{
    return this.http.delete(url)
  }
  
}
