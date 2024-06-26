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

  constructor(private services: Services) {}
  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark=data.dark
  }

  ngOnInit(): void {
    this.showBlockUser();
  }
  showBlockUser() {
    this.services.getUser('http://localhost:3000/user/Blocklist'). subscribe((data) => {
       this.users = data;
    });
}
  

  destroyUser (id:any){
    this.services.deleteUser(`http://localhost:3000/user/${id}/delete`)
    .subscribe(
      (response) => {
        console.log('User created successfully:', response);
      }
    )
  }

  resStoreUser (id:any){
    this.services.restoreUser(`http://localhost:3000/user/${id}/restore`)
    .subscribe((response)=>{
      console.log( response);
    })
  }


  
}
