import { Component } from '@angular/core';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-footer-user',
  standalone: true,
  imports: [HeaderUserComponent,RouterLink],
  templateUrl: './footer-user.component.html',
  styleUrl: './footer-user.component.scss'
})
export class FooterUserComponent {

}
