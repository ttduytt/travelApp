import {  Component } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HeaderComponent } from '../header/header.component';
import { Services } from '../../service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../shared/model/categoryModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [CKEditorModule,HeaderComponent,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss'
})
export class UpdatePostComponent  {
  categorys: Category[]=[]
  title:string =''
  post :any
  public Editor = ClassicEditor;
  constructor( private service:Services,private router:Router) {
    const navigation = this.router.getCurrentNavigation(); 
    if (navigation?.extras.state) {
      this.post = navigation.extras.state['post'];
      console.log(this.post)
      this.title =this.post.title
    }else{
      console.log('ewfwe')
    }
  }
 
  ngOnInit(){
    this.getCategory()
  }

  getCategory(){
    this.service.getAllCategory('http://localhost:3000/category/getAll')
    .subscribe((data)=>{
        this.categorys=data
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
  
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.post.avatar = e.target.result;
        console.log('File loaded:', this.post.avatar); // Log kết quả đọc file
      };
  
      reader.readAsDataURL(file);
    } else {
      console.log('Không có thay đổi hoặc không có tệp nào được chọn');
    }

  }

  updatePost (id:string){
    this.service.updatePost(`http://localhost:3000/post/update/${id}`, this.post)
    .subscribe((response)=>{
      console.log('Post update successfully', response);
    })
  }

}
