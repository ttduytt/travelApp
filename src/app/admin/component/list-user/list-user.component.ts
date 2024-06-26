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
  constructor(private services: Services) {}

  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark=data.dark
  }

  ngOnInit(): void {
    this.showUser();
  }
  showUser() {
    this.services.getUser('http://localhost:3000/user/list'). subscribe((data) => {
       this.users = data;
       console.log(this.users)
    });
}



  blockUser(id:any) {
    this.services.deleteUser(`http://localhost:3000/user/${id}/block`)
    .subscribe(
          (response) => {
            console.log( response);
          }
        )
  }

}
