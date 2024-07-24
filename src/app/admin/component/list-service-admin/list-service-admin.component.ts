import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Services } from '../../service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PendingPost } from '../../../shared/model/pendingPost';
import { RouterLink } from '@angular/router';
import { NotificationDialogComponent } from '../../../shared/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-list-service-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgxPaginationModule, RouterLink, NotificationDialogComponent],
  templateUrl: './list-service-admin.component.html',
  styleUrl: './list-service-admin.component.scss'
})
export class ListServiceAdminComponent {
  isdark:boolean=false
  isclose:boolean=false
  page: number = 1;
  notData=''
  listservice:PendingPost[]=[]

  // biến xác nhận để truyền vào state
  isService=true

  // dùng cho cảnh báo khi nhấn xóa
  modal: any
  idPostDelete=''
  
  constructor(private services: Services) {}

  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark= data.dark
  }

  ngOnInit(): void {
    this.showService();
  }

  showService() {
    this.services.getPendingPostAccept('http://localhost:3000/pendingPost/getPendingPost/Accept'). subscribe((data) => {
     if(Array.isArray(data) && data.length>0){
      this.listservice = data;
     }else{
      this.notData='Không có dữ liệu'
     }
       
  });
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

deleteService(id:string){
  // hàm delete user nhận vào any nên dùng chung đc
  this.services.deleteUser(`http://localhost:3000/pendingPost/deleteService/${id}`)
  .subscribe(data=>{
      this.closeModal()
      this.showService()
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
