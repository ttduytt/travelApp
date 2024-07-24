import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.scss'
})
export class NotificationDialogComponent {
  constructor(private router:Router){}

  @Input() isVisible: boolean=false;
  @Input () message:string=''
  @Input () reject:string=''
  @Output() isVisibleChange = new EventEmitter<boolean>();


  closeNotifi(){
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  closeNotifiAndMove(){
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
    this.router.navigateByUrl(this.reject)
  }
}
