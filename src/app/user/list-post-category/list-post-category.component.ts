import { Component } from '@angular/core';
import { ApiUserService } from '../api-user.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Post } from '../../shared/model/postModel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-post-category',
  standalone: true,
  imports: [CommonModule,RouterLink,HeaderUserComponent],
  templateUrl: './list-post-category.component.html',
  styleUrl: './list-post-category.component.scss'
})
export class ListPostCategoryComponent {
  constructor (private userservice:ApiUserService,private route:ActivatedRoute, private router:Router){}

  listPost:Post []=[]
  notifi:any
  arrayPagination:any
  listPostByPage: Post []=[]
  currentPage=0

  ngOnInit(){
    this.getPost()
  }

 


  clickPage(indexpage:any){
    this.currentPage=indexpage
    var start= this.currentPage*3
    var end= start+3
    this.listPostByPage= this.listPost.slice(start, end)
  }

  nextPage(){
    if(!(this.currentPage+1>=this.arrayPagination.length)){
      this.currentPage+=1
      var start= this.currentPage*3
      var end= start+3
      this.listPostByPage= this.listPost.slice(start, end)
    }

  }

  prevPage(){
    if((this.currentPage-1>=0)){
      this.currentPage-=1
      var start= this.currentPage*3
      var end= start+3
      this.listPostByPage= this.listPost.slice(start, end)
    }
    
  }
// [1,2,3,4,5]
// 0  0-3   
// 1  3-6
// 2  6-9
// 3  9  



  getPost (){
    this.route.paramMap.subscribe(params=>{
     const type= params.get('typepost')
     this.notifi='' 
     this.userservice.getTypePost(`http://localhost:3000/post/get/${type}`)
     .subscribe(data=>{
          if(Array.isArray(data) && data.length>0){
            this.listPost=data
            const countPagination=Math.ceil(this.listPost.length/3) 
            this.arrayPagination= Array.from({length:countPagination},(_,i)=>i+1)  
            this.listPostByPage=this.listPost.slice(this.currentPage, this.currentPage+3)        
          }else{
            this.notifi='Không có nội dung để hiển thị'
          }
     });
    });
  }
}
