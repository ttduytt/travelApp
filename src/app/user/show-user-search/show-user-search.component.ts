import { Component } from '@angular/core';
import { ApiUserService } from '../api-user.service';
import { Post } from '../../shared/model/postModel';
import { CommonModule } from '@angular/common';
import { HostListener, ElementRef } from '@angular/core';
import { Services } from '../../admin/service';
import { Category } from '../../shared/model/categoryModel';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-show-user-search',
  standalone: true,
  imports: [CommonModule,HeaderUserComponent,RouterLink],
  templateUrl: './show-user-search.component.html',
  styleUrl: './show-user-search.component.scss'
})
export class ShowUserSearchComponent {
  dataDynamic={
    category:'',
    view:-1,
    title:0,
    createdAt:0
  }

  lastDataDynamic: { [key: string]: any } = {};

  constructor(private apiserveruser:ApiUserService , private elementRef:ElementRef,
     private server:Services, private route:ActivatedRoute,private router:Router){}
  Posts: Post[]=[]
  showitem: boolean=false
  showmeuCategory: boolean =false
  categorys:Category[]=[]
  userSearchKeyWord:string=''
  notification: string | null = null; 
  countPost :number | null =null

  ngOnInit(){
    this.searchUserTyping()
    this.getCategory()
    
  
  }

  searchUserTyping(){
    this.route.paramMap.subscribe(params=>{
      this.userSearchKeyWord = params.get('keyword')?? ''  
      this.apiserveruser.getPostByKeyWord('http://localhost:3000/post/search/',this.userSearchKeyWord)
      .subscribe(data=>{
        if (typeof data==='string'){
          this.notification = data
          this.Posts=[]
          this.countPost=null
        }else{
          this.Posts=data
          this.countPost= this.Posts.length
          this.notification=null
        }
  
      })
    })
   
  }

  getCategory(){
    this.server.getAllCategory('http://localhost:3000/category/getAll')
    .subscribe((data)=>{
      this.categorys=data
    })
  }

  showChildconten(event:any){
    event.stopPropagation(); // Ngăn chặn sự kiện lan truyền lên document
    this.showitem=!this.showitem
  }

  showCategory(event:any){
    event.stopPropagation();
    this.showmeuCategory=!this.showmeuCategory 
  }


  @HostListener ('document:click', ['$event'])
  onClick(event:Event){
    const btShowContenChild = this.elementRef.nativeElement.querySelector('.menu');
    const btShowcategory= this.elementRef.nativeElement.querySelector('.listCategory')
    if(btShowContenChild && !btShowContenChild.contains(event.target)&& this.showitem){   
      this.showitem=false
    }
    if(this.showmeuCategory && !btShowcategory.contains(event.target) && btShowcategory ){
      this.showmeuCategory=false
    }
    
  }


  //  hàm thay đổi giá trị và css của biến sort
  changeDataDynamic<K extends keyof typeof this.dataDynamic>(attribute: K, value:any, event:any): void {
    this.dataDynamic[attribute] = value;
    for( let key in this.dataDynamic){
      if(key !== 'category' && key !==attribute){
        this.dataDynamic[key as K] = 0 as any;
      }
     
    }
    console.log(this.dataDynamic)
    // handel khi người dùng click vào 1 list item
    event.stopPropagation()
    var items= this.elementRef.nativeElement.querySelectorAll('.menu-item-child')
    items.forEach(function(child:any) {
      child.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
  }

  // cập nhật giá trị và css khi chọn category
  changeValueofCategory<K extends keyof typeof this.dataDynamic>(attribute: K, value:any, event:any){
    event.stopPropagation()
    this.dataDynamic[attribute]=value
    // thay đổi css khi nhấn vào 1 thể loại
    var itemcategorys= this.elementRef.nativeElement.querySelectorAll('.button')
    itemcategorys.forEach((category:any) => {
      if( category.classList.contains('active_category')){
        category.classList.remove('active_category')
       }
       event.currentTarget.classList.add('active_category');
       
    });
  }

  submitReq<K extends keyof typeof this.dataDynamic>(){
    this.lastDataDynamic={}
    for(let key in this.dataDynamic){
      if(this.dataDynamic[key as K]!=='' &&this.dataDynamic[key as K]!==0){
        this.lastDataDynamic[key]=this.dataDynamic[key as K]
      }
     
    }
    if(Object.keys(this.lastDataDynamic)[0]==='view'){
      this.Posts.sort((a, b)=>{
        if (a.view !== b.view) {
          return b.view - a.view; // Sắp xếp giảm dần theo view
        }
        return 0;
      });
      
    }else if(Object.keys(this.lastDataDynamic)[0]==='createdAt'){
        this.Posts.sort((a,b)=>{
           // Kiểm tra và chuyển đổi createdAt thành đối tượng Date
          const dateA = a.createdAt ? new Date(a.createdAt) : null;
          const dateB = b.createdAt ? new Date(b.createdAt) : null;
             // Kiểm tra nếu dateA và dateB tồn tại và là đối tượng Date hợp lệ
        if (dateA && dateB && dateA.getTime() !== dateB.getTime()) {
          return dateB.getTime() - dateA.getTime(); // Sắp xếp giảm dần theo createdAt
        }
           return 0;
      });
    } else if (Object.keys(this.lastDataDynamic)[0]==='title'){
        this.Posts.sort((a,b)=>{
          const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1; // titleA nhỏ hơn titleB, a sẽ đứng sau b
        }
        if (titleA > titleB) {
          return 1; // titleA lớn hơn titleB, a sẽ đứng trước b
        }
        return 0; // titleA bằng titleB, giữ nguyên thứ tự
      })

    }
    
  }

}
