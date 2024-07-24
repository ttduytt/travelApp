import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Services } from '../../service';
import { Post } from '../../../shared/model/postModel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthserviceService } from '../../../shared/authservice.service';
import { NgxPaginationModule } from 'ngx-pagination';
import Cookies from 'js-cookie';
import { HtmlComment } from 'ckeditor5';
@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterLink,NgxPaginationModule],
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {
  posts: Post[] = [];
  page: number = 1;
  isdark:boolean=false
  isclose:boolean=false
  modal: any
  idPostDelete=''
  constructor(private services: Services, private router: Router, private sanitizer: DomSanitizer, private autheservice:AuthserviceService) {}

  ngOnInit(): void {
    this.showPost();
  }

  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark= data.dark
  }

  async showPost() {
    this.services.getPost('http://localhost:3000/post/listPost')
        .subscribe((listpost)=>{
        this.posts=listpost
    })
}
         
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
   
  


      // xóa bài viết
      deletePost (Postid:string){
        this.services.destroyPost('http://localhost:3000/post/delete/', Postid)
        .subscribe(()=>{
          this.closeModal()
          this.showPost()
        })
      }

      filterTable() {
        const input = (document.getElementById('search') as HTMLInputElement).value.toLowerCase();
        const table = document.getElementById('dataTable') as HTMLTableElement;
        const tr = table.getElementsByTagName('tr');
    
        for (let i = 1; i < tr.length; i++) { // Bắt đầu từ 1 để bỏ qua hàng tiêu đề
          const tds = tr[i].getElementsByTagName('td');
          let found = false;
          for (let j = 0; j < tds.length; j++) {
            const tdText = tds[j].textContent;
            if (tdText && tdText.toLowerCase().indexOf(input) > -1) {
              found = true;
              break;
            }
          }
          tr[i].style.display = found ? '' : 'none';
        }
      };
    
    }
   

