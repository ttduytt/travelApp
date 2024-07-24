import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from '../../service';
import { PendingPost } from '../../../shared/model/pendingPost';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-pending-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-pending-post.component.html',
  styleUrl: './detail-pending-post.component.scss'
})
export class DetailPendingPostComponent {

  isService:any

  // dùng cho cảnh báo khi nhấn xóa
  modal: any
  idPostDelete=''

  constructor (private router:Router,private service:Services, private route:ActivatedRoute){
    this.isService = history.state.isService;
  }

  witdhSlide=0
  pendingPost:PendingPost= {
    _id:'',
    kindService:'',
    name: '' , 
    location: '' ,
    number:  '' ,
    email:'',
    img:[],
    introduce:'',
    accept:false,
    view: 0,
    like: 0, 
    createdAt: new Date(),
}

    ngOnInit(){
      this.getPendingPost()
    }

    getPendingPost(){
      this.route.paramMap.subscribe(param=>{
        const id= param.get('id')
        if(id){
          this.service.getPendingPostById(`http://localhost:3000/pendingPost/getOne/${id}`)
          .subscribe(data=>{
            this.pendingPost=data
          });
        };
      
      });
      
    };

    OpenModal(id:string){
      const modal= document.querySelector('#myModal') as HTMLElement
      modal.style.display='block'
    
      this.idPostDelete=id
    }
    
    closeModal(){
      const modal= document.querySelector('#myModal') as HTMLElement
      modal.style.display='none'
      this.idPostDelete=''
    }

    deleteService(id:string){
      // hàm delete user nhận vào any nên dùng chung đc
      this.service.deleteUser(`http://localhost:3000/pendingPost/deleteService/${id}`)
      .subscribe(data=>{
          this.closeModal()
          this.router.navigateByUrl('/list/servicesAdmin')
      })
    }

    slideright(){
      const block= document.querySelector('.wrap-slide') as HTMLElement
      const withBlock= block.offsetWidth
      if (this.witdhSlide< (this.pendingPost.img.length-1)*withBlock){
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

    refusePendingPost(id:any){
      this.service.destroyPost('http://localhost:3000/pendingPost/delete/',id)
      .subscribe((reponse)=>{
        this.router.navigateByUrl('/list/pendingPost')
      })
    }

    acceptPendingPost (){
      this.pendingPost.accept=true
      this.service.acceptPendingPost(`http://localhost:3000/pendingPost/acceptPendingPost/${this.pendingPost._id}`,this.pendingPost)
      .subscribe(data=>{
        this.router.navigateByUrl('/list/pendingPost')
      })
    }
    
}
