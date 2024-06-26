import { Component } from '@angular/core';
import { ApiUserService } from '../api-user.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../shared/model/postModel';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss'
})
export class HeaderUserComponent {
  constructor(private apiUserService:ApiUserService){}

  placePosts:Post []=[]
  hightLightPosts:Post []=[]
    ngOnInit(){
      this.getPlacePost()
      this.getHighlightPost()
   
    }

    getPlacePost (){
      this.apiUserService.getTypePost('http://localhost:3000/post/get/địa điểm')
      .subscribe ((data)=>{
        this.placePosts=data
      
      })
    }

    getHighlightPost (){
      this.apiUserService.getTypePost('http://localhost:3000/post/get/nổi bật')
      .subscribe ((data)=>{
        this.hightLightPosts=data
      })
    }

  }
