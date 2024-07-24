import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Services } from '../../service';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-poin-statistical',
  standalone: true,
  imports: [HeaderComponent,CommonModule, NgxPaginationModule],
  templateUrl: './poin-statistical.component.html',
  styleUrl: './poin-statistical.component.scss'
})
export class PoinStatisticalComponent {
  isdark:boolean=false
  isclose:boolean=false
  Statistics:any
  page: number = 1;
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
