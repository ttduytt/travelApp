import { Component,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Services } from '../../admin/service';
import { PendingPost } from '../../shared/model/pendingPost';
import { CommonModule } from '@angular/common';
import { ApiUserService } from '../api-user.service';


@Component({
  selector: 'app-render-service-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './render-service-post.component.html',
  styleUrl: './render-service-post.component.scss'
})
export class RenderServicePostComponent {

  servicePost:PendingPost= {
    _id:'',
    kindService:'',
    name: '' , 
    location: '' ,
    number:  '' ,
    email:'',
    img:[],
    introduce:'',
    view: 0,
    like: 0, 
    createdAt: new Date(),
}


  witdhSlide=0
  isLike=false
  likedPosts: string[] = [];

  constructor(private route: ActivatedRoute, private service:Services, private apiuser:ApiUserService){}

  ngOnInit(){
    this.getPendingPost()
 
  }


 

  updateViewService(){
    this.apiuser.updateView(`http://localhost:3000/pendingPost/updateview/${this.servicePost._id}`)
    .subscribe(data=>{
      this.servicePost.view=data.view
    })
  }

  updateLike(){
    if(!this.isLike){
      this.apiuser.updateLike(`http://localhost:3000/pendingPost/updatelike/${this.servicePost._id}`)
      .subscribe(data=>{
         this.servicePost.like=data.like

         // thêm id bài viết vào mảng likedPosts
         if (this.servicePost._id !== undefined) {
          this.likedPosts.push(this.servicePost._id);
          sessionStorage.setItem('likedPosts', JSON.stringify(this.likedPosts))
        }

         this.isLike=true
      })
    }
   
  }

  getPendingPost(){
    this.route.paramMap.subscribe(param=>{
      const id= param.get('id')
      if(id){
        this.service.getPendingPostById(`http://localhost:3000/pendingPost/getOne/${id}`)
        .subscribe(data=>{
            this.servicePost=data
            // cập nhật lượt xem
            this.updateViewService()

            // kiểm tra có được phép like nữa ko
            const arrLikedPostsString= sessionStorage.getItem('likedPosts')
            if (arrLikedPostsString){
              const arrLikedPosts= JSON.parse(arrLikedPostsString || '[]')
              if(arrLikedPosts.includes(data._id)){
                this.isLike=true
              } 
            }

        });
      };
     
    });
    
  };

  slideright(){
    const block= document.querySelector('.wrap-slide') as HTMLElement
    const withBlock= block.offsetWidth
    if (this.witdhSlide< (this.servicePost.img.length-1)*withBlock){
      this.witdhSlide+=withBlock
      block.style.transform=`translateX(${this.witdhSlide *-1}px)`
    }

  }

  slideleft(){
    const block= document.querySelector('.wrap-slide') as HTMLElement
    const withBlock= block.offsetWidth
    if (this.witdhSlide>0 ){
      this.witdhSlide-=withBlock
      block.style.transform=`translateX(${this.witdhSlide *-1}px)`
    }

  }
  
}
