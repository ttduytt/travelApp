import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Services } from '../../service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {


  isclose:boolean=false
  valueCharts :any

  constructor(private service:Services) {}

  ngOnInit(){
    this.setchartValue()
  }

  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
  }

  setchartValue(){
    this.service.getPoinStatistics('http://localhost:3000/poinRating/get/Statistics')
    .subscribe ((data)=>{
     this.valueCharts= data.map((item)=>{
        return {value:(item.totalPoinrating/item.count)/5*100 , title:item.title, dtb:Math.floor((item.totalPoinrating/item.count) * 10) / 10}
        
      });
      console.log(this.valueCharts)
    });
    
  }
}
