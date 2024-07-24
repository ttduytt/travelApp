import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../shared/model/userModel'
import { Post} from '../shared/model/postModel';
import { Observable } from 'rxjs';
import { Category } from '../shared/model/categoryModel';
import { HttpHeaders } from '@angular/common/http';
import { StatisticsPoin } from '../shared/model/Statisticspoin';
import { Image } from '../shared/model/imageModel';
import { PendingPost } from '../shared/model/pendingPost';

@Injectable({
  providedIn: 'root'
})
export class Services {

  constructor(private http: HttpClient) { }

/// lấy user
 
 
getUser(url: string): Observable<[User]> {
  return this.http.get<[User]>(url);
}


 // xóa
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
  
  getPost (url:string): Observable<Post[]>{

    return this.http.get<Post[]>(url)
  }

  // xóa bài viết 
  destroyPost(url: string, postId: string): Observable<any> {
    return this.http.delete(`${url}${postId}`);
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

  createImage (url:string, data:Image):Observable<any>{
    return this.http.post<any>(url, data)
  }

  getImages (url:string):Observable<[Image]>{
    return this.http.get<[Image]>(url)
  }

  getPendingPostNotAccept(url:string):Observable<[PendingPost]>{
    return this.http.get<[PendingPost]>(url)
  }

  getPendingPostAccept(url:string):Observable<[PendingPost]>{
    return this.http.get<[PendingPost]>(url)
  }

  getPendingPostById(url: string):Observable<PendingPost>{
    return this.http.get<PendingPost>(url)
  }

  acceptPendingPost(url:string, data:PendingPost):Observable<any>{
    return this.http.put<any>(url,data)
  }

  logOut(url: string):Observable<any>{{
      return this.http.get<any>(url,{ withCredentials: true })
  }}
 
  UploadImg(url:string, formData:any):Observable<any>{
    return this.http.post<any>(url, formData)
  }

}
