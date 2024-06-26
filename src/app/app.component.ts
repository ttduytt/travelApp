import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreatePostComponent } from './admin/component/create-post/create-post.component';
import { HeaderUserComponent } from './user/header-user/header-user.component';
import { FooterUserComponent } from './user/footer-user/footer-user.component';
import { HompageUserComponent } from './user/hompage-user/hompage-user.component';
import { ContentPostComponent } from './user/content-post/content-post.component';
import { LoginComponent } from './shared/login/login.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent,RouterOutlet,CreatePostComponent,HeaderUserComponent,FooterUserComponent,ContentPostComponent,HompageUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'apptravel';

}
