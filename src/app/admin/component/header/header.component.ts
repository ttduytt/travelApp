import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Services } from '../../service';
import { AuthserviceService } from '../../../shared/authservice.service';
import { Router } from '@angular/router';
import { NotificationDialogComponent } from '../../../shared/notification-dialog/notification-dialog.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,NotificationDialogComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isClose=false
  isdark=false
  islogout=false
  about_admin:any

  // dành cho component thông báo
	showDialog: boolean = false;
	notificationMessage: string = '';
	linkrouter:string=''
  constructor(private service:Services, private autheservice:AuthserviceService, private router:Router){}

  ngOnInit (){
    const savedMode = localStorage.getItem('isDarkMode');
    if (savedMode !== null) {
      this.isdark= JSON.parse(savedMode);
    }

    this.about_admin=document.querySelector('.about_admin') as HTMLElement

    
  }
  @Output() sendData:EventEmitter<{close: boolean, dark: boolean}> = new EventEmitter<{close: boolean, dark: boolean}>();
  
  changeNavbar (){
    this.isClose = !this.isClose
    const data ={close:this.isClose, dark:this.isdark}
    this.sendData.emit(data);
  
  }

  changeMode(){
    this.isdark=!this.isdark
    const data ={close:this.isClose, dark:this.isdark}
    this.sendData.emit(data);
    localStorage.setItem('isDarkMode', JSON.stringify(this.isdark));
  }

  Logout(){
    this.autheservice.removeCookie()
    this.autheservice.removeAccessToken()
    this.service.logOut('http://localhost:3000/auth/logout')
    .subscribe(notifi=>{
      this.showDialog=true
      this.notificationMessage='Đăng xuất thành công'
      this.linkrouter=''
    })
  }

  openLogout(event:any){
    event.stopPropagation()
    this.islogout=!this.islogout
  }

  @HostListener('document:click',['$event'])
  ondocumentClick(event:any){
      if(this.islogout){
        this.islogout=false
      }
    } 

  

}

  

