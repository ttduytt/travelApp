import { Component } from '@angular/core';
import { ApiUserService } from '../api-user.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { PendingPost } from '../../shared/model/pendingPost';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [CommonModule,RouterLink,HeaderUserComponent],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.scss'
})
export class ListServiceComponent {
  constructor (private userservice:ApiUserService,private route:ActivatedRoute, private router:Router){}
  listService:PendingPost []=[]
  notifi:any
  arrayPagination:any
  listServiceByPage: PendingPost []=[]
  currentPage=0

  ngOnInit(){
    this.getService()
  }

 


  clickPage(indexpage:any){
    this.currentPage=indexpage
    var start= this.currentPage*3
    var end= start+3
    this.listServiceByPage= this.listService.slice(start, end)
  }

  nextPage(){
    if(!(this.currentPage+1>=this.arrayPagination.length)){
      this.currentPage+=1
      var start= this.currentPage*3
      var end= start+3
      this.listServiceByPage= this.listService.slice(start, end)
    }

  }

  prevPage(){
    if((this.currentPage-1>=0)){
      this.currentPage-=1
      var start= this.currentPage*3
      var end= start+3
      this.listServiceByPage= this.listService.slice(start, end)
    }
    
  }
// [1,2,3,4,5]
// 0  0-3   
// 1  3-6
// 2  6-9
// 3  9  



  getService (){
    this.route.paramMap.subscribe(params=>{
     const type= params.get('typeservice')
     this.notifi='' 
     this.userservice.getServiceByType(`http://localhost:3000/pendingPost/forUser/getbyType/${type}`)
     .subscribe(data=>{
          if(Array.isArray(data)){
            this.listService=data
            const countPagination=Math.ceil(this.listService.length/3) 
            this.arrayPagination= Array.from({length:countPagination},(_,i)=>i+1)  
            this.listServiceByPage=this.listService.slice(this.currentPage, this.currentPage+3)        
          }else{
            this.notifi=data
            console.log(this.notifi)
          }
     });
    });
  }
}
