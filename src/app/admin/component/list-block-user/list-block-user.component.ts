import { Component } from '@angular/core';
import { Services } from '../../service';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/model/userModel';
import { HeaderComponent } from '../header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-list-block-user',
  standalone: true,
  imports: [CommonModule,HeaderComponent,NgxPaginationModule],
  templateUrl: './list-block-user.component.html',
  styleUrl: './list-block-user.component.scss'
})
export class ListBlockUserComponent {
 
  isdark:boolean=false
  isclose:boolean=false
  users: User []=[]
  page: number = 1;
  idUserDelete=''
  notData=''
  constructor(private services: Services) {}
  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark=data.dark
  }

  ngOnInit(): void {
    this.showBlockUser();
  }

  

OpenModal(id:string){
  const modal= document.querySelector('#myModal') as HTMLElement
  modal.style.display='block'

  this.idUserDelete=id
  console.log(this.idUserDelete)
}

closeModal(){
  const modal= document.querySelector('#myModal') as HTMLElement
  modal.style.display='none'
  this.idUserDelete=''
}

showBlockUser() {
  this.services.getUser('http://localhost:3000/user/Blocklist')
  .subscribe((data) => {
    if(Array.isArray(data)){
      this.users = data;
    }else{
      this.notData='Không có dữ liệu'
    }
  });
}

  destroyUser (id:any){
    this.services.deleteUser(`http://localhost:3000/user/${id}/delete`)
    .subscribe(
      (response) => {
        this.closeModal()
        this.showBlockUser()
      }
    )
  }

  resStoreUser (id:any){
    this.services.restoreUser(`http://localhost:3000/user/${id}/restore`)
    .subscribe((response)=>{
      this.showBlockUser()
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
