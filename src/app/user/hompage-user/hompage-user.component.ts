import { Component,AfterViewInit } from '@angular/core';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { FooterUserComponent } from '../footer-user/footer-user.component';
import { RouterLink } from '@angular/router';
import { ApiUserService } from '../api-user.service';
import { Post } from '../../shared/model/postModel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-hompage-user',
  standalone: true,
  imports: [FooterUserComponent,HeaderUserComponent,RouterLink,CommonModule],
  templateUrl: './hompage-user.component.html',
  styleUrl: './hompage-user.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class HompageUserComponent implements AfterViewInit {
  constructor (private apiurlService:ApiUserService, private router:Router){}
  posts:Post[]=[]
   post:any
  images: string[] = [
    'https://danviet.mediacdn.vn/2020/6/5/1-15913419719771038118165.jpg',
    'https://ik.imagekit.io/tvlk/blog/2023/07/chua-tay-thien-8.jpg?tr=dpr-2,w-675',
    'https://danviet.mediacdn.vn/2020/6/5/12-15913419882161035358480.jpg'
    // Thêm các liên kết ảnh khác nếu cần
  ];

  currentImage: string = this.images[0];
  private imageIndex: number = 0;
  private intervalId: any;



  ngOnInit(): void {
    this.startImageRotation();
    this.getTypePost('khám phá')
  }

  ngAfterViewInit(): void {
    window.addEventListener('dfMessengerLoaded', this.onDfMessengerLoaded);
  }
// hàm chỉnh chiều cao chatbox
  onDfMessengerLoaded(event: Event) {
    const messenger = document.querySelector("df-messenger") as HTMLElement;
    const chatElement = messenger.shadowRoot?.querySelector("df-messenger-chat");

    if (chatElement) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`div.chat-wrapper[opened="true"] { height: 420px }`);
      (chatElement.shadowRoot as any).adoptedStyleSheets = [sheet];
    }
  }

  getTypePost(keyword:string){
    this.apiurlService.getTypePost(`http://localhost:3000/post/get/${keyword}`)
    .subscribe((data)=>{
      this.posts=data
    })
  }

  getOnepost (keyword:string){
    this.apiurlService.getOnePost(`http://localhost:3000/post/getOne/${keyword}`)
    .subscribe((data)=>{
      this.post=data
      this.router.navigateByUrl(`/content/post/${this.post.title}`, {state:{data:this.post}})
    })
    
  }



  ngOnDestroy(): void {
    this.stopImageRotation();
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.imageIndex = (this.imageIndex + 1) % this.images.length;
      this.currentImage = this.images[this.imageIndex];
    }, 2000); // Thay đổi ảnh sau mỗi 5 giây
  }

  stopImageRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  //To minimise the height of chatbox
// $(document).ready(function() {
//   window.addEventListener('dfMessengerLoaded', function (event) {
//   $r1 = document.querySelector("df-messenger");
//   $r2 = $r1.shadowRoot.querySelector("df-messenger-chat");
//   $r3 = $r2.shadowRoot.querySelector("df-messenger-user-input"); //for other mods
//   var sheet = new CSSStyleSheet;
//   // manage box height from here
//   sheet.replaceSync( `div.chat-wrapper[opened="true"] { height: 340px }`);
//        $r2.shadowRoot.adoptedStyleSheets = [ sheet ];
//   });
// });
}
