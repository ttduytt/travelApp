import { Component } from '@angular/core';
import { ApiUserService } from '../api-user.service';
import { Post } from '../../shared/model/postModel';
import { CommonModule } from '@angular/common';
import { HostListener, ElementRef } from '@angular/core';
import { Services } from '../../admin/service';
import { Category } from '../../shared/model/categoryModel';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-viewallpost',
  standalone: true,
  imports: [CommonModule,HeaderUserComponent,RouterLink],
  templateUrl: './viewallpost.component.html',
  styleUrl: './viewallpost.component.scss'
})
export class ViewallpostComponent {

  dataDynamic={
    category:'',
    view:-1,
    title:0,
    createdAt:0
  }

  lastDataDynamic: { [key: string]: any } = {};

  constructor(private apiserveruser:ApiUserService , private elementRef:ElementRef, private server:Services){}
  Posts: Post[]=[]
  showitem: boolean=false
  showmeuCategory: boolean =false
  categorys:Category[]=[]
  ngOnInit(){
    this.getCategory()
    this.getHighPost()
  }

  getCategory(){
    this.server.getAllCategory('http://localhost:3000/category/getAll')
    .subscribe((data)=>{
      this.categorys=data
    })
  }

  getHighPost(){
    this.apiserveruser.getPostViewhigh('http://localhost:3000/post/get/sortDown')
    .subscribe((data)=>{
      this.Posts=data
      
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

    console.log(this.lastDataDynamic)
    this.apiserveruser.dynamicSearch('http://localhost:3000/post/get/dynamicSearch', this.lastDataDynamic)
    .subscribe((data)=>{
      this.Posts= data
    })
  }



}
