import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Services } from '../../service';
@Component({
  selector: 'app-poin-statistical',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './poin-statistical.component.html',
  styleUrl: './poin-statistical.component.scss'
})
export class PoinStatisticalComponent {
  isdark:boolean=false
  isclose:boolean=false
  Statistics:any
  constructor(private service:Services){}
  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark=data.dark
  }

  ngOnInit(){
    this.getPoinStatistics()
  }

  getPoinStatistics(){
    this.service.getPoinStatistics('http://localhost:3000/poinRating/get/Statistics')
    .subscribe((data)=>{
      this.Statistics=data
    })
  }
}
