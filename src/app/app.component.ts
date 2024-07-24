
import { RouterOutlet } from '@angular/router';
import { CreatePostComponent } from './admin/component/create-post/create-post.component';
import { HeaderUserComponent } from './user/header-user/header-user.component';
import { FooterUserComponent } from './user/footer-user/footer-user.component';
import { HompageUserComponent } from './user/hompage-user/hompage-user.component';
import { ContentPostComponent } from './user/content-post/content-post.component';
import { LoginComponent } from './shared/login/login.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubriceServiceComponent } from './user/subrice-service/subrice-service.component';
import {CloudinaryModule} from '@cloudinary/ng';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CloudinaryModule,SubriceServiceComponent,CommonModule,LoginComponent,RouterOutlet,CreatePostComponent,HeaderUserComponent,FooterUserComponent,ContentPostComponent,HompageUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent  {

  title = 'apptravel';
  img!: CloudinaryImage;
  constructor(){}




}
