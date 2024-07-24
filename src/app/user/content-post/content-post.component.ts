import { Component,HostListener} from '@angular/core';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { FooterUserComponent } from '../footer-user/footer-user.component';
import { ApiUserService } from '../api-user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthserviceService } from '../../shared/authservice.service';
import { Services } from '../../admin/service';


@Component({
  selector: 'app-content-post',
  standalone: true,
  imports: [HeaderUserComponent,CommonModule,FooterUserComponent,RouterLink,FormsModule],
  templateUrl: './content-post.component.html',
  styleUrl: './content-post.component.scss'
})
export class ContentPostComponent implements  AfterViewInit{

   scrolledToEnd: boolean = false;
    post:any
    listSuggestPosts:any
    poin:number=0
    contentpoinrating=''
    poinPost:any
    averagePoin:number=0
    PoinRatings:any
    controller='noidung'
    countUserComment=0
    currentOpenMenu: HTMLElement | null = null;

    data ={
      id_post:'',
      id_user:'',
      poinRating:0,
      content: '',
    }
  constructor(private router:Router,private apiUserService:ApiUserService,
     private route: ActivatedRoute, private autheservice:AuthserviceService,private service:Services,

    ){
     
  }

  ngOnInit(): void {


    this.loadData()

  }


  getRating(){
    const token= this.autheservice.getToken()
    if(token){
      this.autheservice.refreshToken('http://localhost:3000/auth/refresh')
      .subscribe ((response:any)=>{
        if (response.newAccessToken){
          this.autheservice.setToken(response.newAccessToken)
         const newtoken =this.autheservice.getToken()
          if(newtoken){
            this.apiUserService.getRatingWithLogin(`http://localhost:3000/poinRating/get/allwithLogin/${this.post._id}`,newtoken)
                .subscribe((response)=>{
                  if(response.lastarr){
                    this.PoinRatings=response.lastarr
                    this.countUserComment=response.CountUserRating
                    console.log(this.countUserComment)
                  }else{
                    console.log(response)
                  }
                })
          }
        }else{
          this.apiUserService.getRating(`http://localhost:3000/poinRating/get/all/${this.post._id}`)
              .subscribe((response)=>{
                if(response){
                  this.PoinRatings=response
                }else{
                  alert('không có đánh giá')
                }
              })
        }
      });
    }else{
      this.apiUserService.getRating(`http://localhost:3000/poinRating/get/all/${this.post._id}`)
      .subscribe((response)=>{
          if(response){
            this.PoinRatings=response
          }else{
            alert('không có đánh giá')
          }
      })
    
    }

  
  }

  getSuggestPost(){
    const kindPost=this.post.category
    this.apiUserService.getSuggestPost(`http://localhost:3000/post/suggest/${kindPost}`,this.post._id)
    .subscribe((listSuggest)=>{
      this.listSuggestPosts=listSuggest
    })
  }

  // hàm tính điểm trung bình đánh giá
  roundNumber (num:number):number{
    let sochan= Math.floor(num)
    let sole= num-sochan

    if(sole===0.5){
      return num
    }else if(sole===0.9){
      return Math.ceil(num)
    }else if ((sole < 0.5 && sole >0) || (sole>0.5 && sole<0.9)){
      return sochan+0.5
    }else{
      return num
    }

  }

  getPoin(){
    this.service.getPoinStatistics('http://localhost:3000/poinRating/get/Statistics')
    .subscribe ((PoinStatistics)=>{
      this.poinPost = PoinStatistics.find(item => item.id_post === this.post._id);
      if(this.poinPost){
        this.averagePoin= this.roundNumber(this.poinPost.totalPoinrating/this.poinPost.count) 
      setTimeout(()=>{
         // logic in màu ngôi sao theo số điểm
          const starsChild = document.querySelectorAll('.child-star-item')
          console.log(starsChild)
          starsChild.forEach ((star)=>{
          if(star.classList.contains('fill') ||star.classList.contains('fillHaft')){
            star.classList.remove('fill', 'fillHaft');
          }
          
          const dataValue = star.getAttribute('data-value');
          const parsedValue = dataValue ? parseFloat(dataValue):0
          
          if (this.averagePoin>=parsedValue ){
          
            star.classList.add('fill')
          }else if(this.averagePoin===parsedValue-0.5){
            star.classList.add('fillHaft')
          }

        })
      },0);

      }else{
        return 
      }
      

    })
  }

  loadData(): void {
   this.route.paramMap.subscribe(params=>{
      const name= params.get('title')
      this.apiUserService.getOnePost('http://localhost:3000/post/getOne/'+name)
      .subscribe((data)=>{
        this.post=data
        this.getRating()
        this.getSuggestPost()
        this.getPoin()
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
   })
    
  }

  ngAfterViewInit(): void {

   
    // Your JavaScript code here
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
      star.addEventListener('click', ()=>{
        stars.forEach(star => {
          star.classList.remove('highlighted');
      });
        for (let i = 0; i <= index; i++) {
          stars[i].classList.add('highlighted');
        }
      })

    });

    this.getPoinrating()
  
    
 

  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(id:any): void {
    if (!this.scrolledToEnd && window.innerHeight + window.scrollY >=document.body.scrollHeight -470) {
      id=this.post._id
      console.log('end')
      this.apiUserService.updateView(`http://localhost:3000/post/updateview/${id}`)
      .subscribe(()=>{
        console.log('gửi thành công')
      })
      this.scrolledToEnd=true
    }

    const menu_controller=document.querySelector('.menu-controller') as HTMLElement
      if (window.scrollY > 632+170) { 
        menu_controller.classList.add('fixed');
      } else {
        menu_controller.classList.remove('fixed');
      }
  }

  

  getPoinrating(){
    const stars= document.querySelectorAll('.star')
    stars.forEach ((star)=>{
      star.addEventListener('click',(event)=>{
        this.poin= Number(star.getAttribute('data-value'))
        console.log(this.poin)
      })
    })
   
  }

  createPoinRating (){
    this.data.id_post =this.post._id
    this.data.poinRating =this.poin
    this.data.content=this.contentpoinrating

    if(!this.autheservice.getToken()){
      alert('ban can dang nhap')
    }else{
      // refresh token trc nếu rf thành công thì mới tạo đánh giá
    this.autheservice.refreshToken('http://localhost:3000/auth/refresh')
    .subscribe ((response:any)=>{
      if (response.newAccessToken){
        this.autheservice.setToken(response.newAccessToken)
      const token= this.autheservice.getToken()
          if(token!==null){
            this.apiUserService.addpoinRating('http://localhost:3000/poinRating/add',this.data,token)
          .subscribe((rating)=>{
            if(rating instanceof Object){
            alert('thêm đánh giá thành công')
              this.getRating()
            }else{
              alert (rating)
            }

          })
          }

      }else{
        alert(response)
      }
    })
    }

  }

  // code kiểm tra xem ngươi dùng được phép nhấn nút đánh giá chưa
  get checkCondition(): boolean {
    return this.poin > 0 && this.contentpoinrating !== '';
  }

  controllerActive(conten:string){
    this.controller=conten

    // cuộn trang đến nội dung tương ứng
    const element = document.getElementById(conten);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }


  }

  

 
  openmenuComment(event: Event){
    event.stopPropagation()

    const target = event.currentTarget as HTMLElement;
    const delete_comment= target.querySelector('.delete-comment') as HTMLElement


    // remove bỏ class openmenu ở menu cũ nếu như click vào menu khác
    if (this.currentOpenMenu && this.currentOpenMenu !== delete_comment) {
      this.currentOpenMenu.classList.remove('openmenu');
    }

      if(delete_comment.classList.contains('openmenu')){
        delete_comment.classList.remove('openmenu')
        document.body.style.overflow = 'auto';
        this.currentOpenMenu = null;
      }else{
        delete_comment.classList.add('openmenu')
        document.body.style.overflow = 'hidden'
        this.currentOpenMenu = delete_comment;
      }    
    

    
  }

  @HostListener('window:click', ['$event'])
  clickwrapper(){
    if (this.currentOpenMenu ){
      this.currentOpenMenu.classList.remove('openmenu');
      document.body.style.overflow = 'auto';
      this.currentOpenMenu = null;
    }
  }

  deleteRating(id: string){
    this.apiUserService.deleteRating(`http://localhost:3000/poinRating/delete/${id}`)
    .subscribe(response=>{
      if(response){
        alert(response)
        this.getRating()
      }
    })
    
  }


}
