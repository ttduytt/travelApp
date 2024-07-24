import { Component } from '@angular/core';
import {User} from '../../../shared/model/userModel';
import {Services} from '../../service';
import { HttpResponse } from '@angular/common/http';
import {HeaderComponent} from '../header/header.component'
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [HeaderComponent,CommonModule,NgxPaginationModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {
  users: User []=[]
  isdark:boolean=false
  isclose:boolean=false
  page: number = 1;
  notData=''
  constructor(private services: Services) {}

  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark= data.dark
  }

  ngOnInit(): void {
    this.showUser();
  }
  showUser() {
    this.services.getUser('http://localhost:3000/user/list'). subscribe((data) => {
     if(Array.isArray(data) && data.length>0){
      this.users = data;
     }else{
      this.notData='Không có dữ liệu'
     }
       
  });
}



  blockUser(id:any) {
    this.services.deleteUser(`http://localhost:3000/user/${id}/block`)
    .subscribe(
          (response) => {
            this.showUser()
          }
        )
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
