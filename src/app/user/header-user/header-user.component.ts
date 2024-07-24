import { Component } from '@angular/core';
import { ApiUserService } from '../api-user.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../shared/model/postModel';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../shared/authservice.service';
import { Services } from '../../admin/service';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss'
})
export class HeaderUserComponent {
  constructor(private service:Services, private apiUserService:ApiUserService, private router:Router, private autheservice:AuthserviceService){}

  placePosts:Post []=[]
  eatPost:Post []=[]
  eventPosts:Post []=[]
  searchKeyWord=''
  textLogin=''
  ckeckUserLogin:string=''

    ngOnInit(){
      this.getPlacePost()
      this.getHighlightPost()
      this.verifyUser()
      this.getEatPost()

    }


    verifyUser(){
        // xem user đã từng đăng nhập chưa
        const cookieCkUser= this.autheservice.readFromCookie()
        if(cookieCkUser){
          console.log(this.textLogin)
           this.textLogin='Logout'
          return ;
        }

      const token= this.autheservice.getToken()
      if(token){
        this.apiUserService.verifyUser('http://localhost:3000/user/verrify', token)
        .subscribe(notification=>{
          if (notification.user){
            this.textLogin='Logout'
            this.ckeckUserLogin='true'
            this.autheservice.saveToCookie( this.ckeckUserLogin)
            console.log(this.textLogin)
          }else{
              this.textLogin='Sigh in'
          }
        })
      }else{
        this.textLogin='Sigh in'
        console.log(this.textLogin)
      }
    }

    removeToken(){
      this.autheservice.removeCookie()
      this.autheservice.removeAccessToken()
      this.service.logOut('http://localhost:3000/auth/logout')
      .subscribe(notifi=>{
        
      })
    }

    sendUserKeyword(){
      this.router.navigateByUrl(`/post/userSearch/${this.searchKeyWord}`)
    }

    getPlacePost (){
      this.apiUserService.getTypePost('http://localhost:3000/post/get/địa điểm')
      .subscribe ((data)=>{
        this.placePosts=data
      })
    }

    getEatPost (){
      this.apiUserService.getTypePost('http://localhost:3000/post/get/ẩm thực')
      .subscribe ((data)=>{
        this.eatPost=data
      })
    }

    getHighlightPost (){
      this.apiUserService.getTypePost('http://localhost:3000/post/get/sự kiện')
      .subscribe ((data)=>{
        this.eventPosts=data
      })
    }

  }
