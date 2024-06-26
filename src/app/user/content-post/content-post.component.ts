import { Component,HostListener } from '@angular/core';
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
@Component({
  selector: 'app-content-post',
  standalone: true,
  imports: [HeaderUserComponent,CommonModule,FooterUserComponent,RouterLink,FormsModule],
  templateUrl: './content-post.component.html',
  styleUrl: './content-post.component.scss'
})
export class ContentPostComponent implements   AfterViewInit{
   scrolledToEnd: boolean = false;
    post:any
    poin:number=0
    contentpoinrating=''
    

    data ={
      id_post:'',
      id_user:'',
      poinRating:0,
      content: '',
    }
  constructor(private router:Router,private apiUserService:ApiUserService, private route: ActivatedRoute, private autheservice:AuthserviceService){
    this.loadData()
  }

  ngOnInit(): void {
  
    this.getPoinrating()
    // Lắng nghe sự kiện NavigationEnd để phát hiện sự thay đổi của URL và gọi lại hàm load data
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.loadData();
    });

    
  }

  loadData(): void {
    this.route.paramMap.subscribe(params => {
   
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.post = navigation.extras.state['data'];
        this.scrolledToEnd=false
      } else {
        console.log('Không có dữ liệu trong state');
        // Bạn có thể gọi API hoặc thực hiện hành động khác nếu cần
      }
    });
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
  }

  getPoinrating(){
    const stars= document.querySelectorAll('.star')
    stars.forEach ((star)=>{
      star.addEventListener('click',(event)=>{
        this.poin= Number(star.getAttribute('data-value'))
      })
    })
   
  }

  createPoinRating (){
    this.data.id_post =this.post._id
    this.data.poinRating =this.poin
    this.data.content=this.contentpoinrating

   const token= this.autheservice.getToken()
   if(token !==null){
    this.apiUserService.addpoinRating('http://localhost:3000/poinRating/add', this.data,token)
    .subscribe ((rating)=>{
      console.log(rating)
    })
   }
 
  }

  // code kiểm tra xem ngươi dùng được phép nhấn nút đánh giá chưa
  get checkCondition(): boolean {
    return this.poin > 0 && this.contentpoinrating !== '';
  }


}
