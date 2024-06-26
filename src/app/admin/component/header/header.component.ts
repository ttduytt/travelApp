import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isClose=false
  isdark=false

  ngOnInit (){
    const savedMode = localStorage.getItem('isDarkMode');
    if (savedMode !== null) {
      this.isdark= JSON.parse(savedMode);
    }
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
  }

  

