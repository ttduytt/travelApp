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
  constructor(private services: Services, private router: Router, private sanitizer: DomSanitizer, private autheservice:AuthserviceService) {}

  ngOnInit(): void {
    this.showPost();
  }

  async showPost() {
    // chủ động làm mới token
    this.autheservice.refreshToken('http://localhost:3000/auth/refresh')
    .subscribe ((newtoken)=>{
        this.autheservice.setToken(newtoken)
        const token= this.autheservice.getToken()
        if(token!==null){
          this.services.getPost('http://localhost:3000/post/listPost',token)
          .subscribe(data => {
            this.posts = data;
          });
        }
    })
   
  }


      // xóa bài viết
      deletePost (Postid:string){
        this.services.destroyPost('http://localhost:3000/post/delete/', Postid)
        .subscribe(()=>{
          console.log('delete sucsesfuuly')
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
      }
    
    }
   

