import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component'
import { Services } from '../../service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PendingPost } from '../../../shared/model/pendingPost';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-list-pending-post',
  standalone: true,
  imports: [HeaderComponent,NgxPaginationModule,CommonModule,RouterLink],
  templateUrl: './list-pending-post.component.html',
  styleUrl: './list-pending-post.component.scss'
})
export class ListPendingPostComponent {
  isdark:boolean=false
  isclose:boolean=false
  page: number = 1;
  listPending:PendingPost []=[]
  constructor(private services: Services) {}

  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark=data.dark
  }

  ngOnInit(){
    this.getListPending()
  }

  getListPending(){
    this.services.getPendingPostNotAccept('http://localhost:3000/pendingPost/getPendingPost/notAccept')
    .subscribe(data=>{
      this.listPending=data
    })
  }

  refusePendingPost(id:any){
    this.services.destroyPost('http://localhost:3000/pendingPost/delete/',id)
    .subscribe((reponse)=>{
      console.log(reponse)
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
