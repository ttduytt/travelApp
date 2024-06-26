import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../shared/model/userModel'
import { Post} from '../shared/model/postModel';
import { Observable } from 'rxjs';
import { Category } from '../shared/model/categoryModel';
import { HttpHeaders } from '@angular/common/http';
import { StatisticsPoin } from '../shared/model/Statisticspoin';

@Injectable({
  providedIn: 'root'
})
export class Services {

  constructor(private http: HttpClient) { }

/// lấy user
 
 
getUser(url: string): Observable<[User]> {
  return this.http.get<[User]>(url);
}

  // xóa user 
 
  deleteUser(url: string): Observable<any>{
    return this.http.delete(url)
  }

  updateUser (id:string, user:any): Observable<User>{
    const Url_updateuser=`http://localhost:3000/user/${id}/update`
    return this.http.patch<User>(Url_updateuser, user)
  }

  // thêm bài viết
  addPost (url:string, post:Post): Observable<Post>{
    return this.http.post<Post> (url, post)
  }

  // lấy bài viết 
  
  getPost (url:string, token:string): Observable<Post[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + token
      }),
    };
    return this.http.get<Post[]>(url, httpOptions)
  }

  // xóa bài viết 
  destroyPost (url:string, id:string) {
    return this.http.delete(url+`${id}`)
  }

  // update post
  updatePost (url:string, data:Post): Observable<Post>{
    return this.http.put<Post>(url, data)
  }

  addCategory(url:string, data:Category):Observable<Category>{
      return this.http.post<Category>(url, data)
  }

  getAllCategory (url:string):Observable<[Category]>{
     return this.http.get<[Category]>(url)
  }

  restoreUser (url:string):Observable<[any]>{
    return this.http.get<any>(url)
  }

  getPoinStatistics(url:string):Observable<[StatisticsPoin]>{
    return this.http.get<[StatisticsPoin]>(url)
  }
  
}
