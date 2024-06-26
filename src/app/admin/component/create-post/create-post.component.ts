import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../../shared/model/postModel';
import { Services } from '../../service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../shared/model/categoryModel';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [HeaderComponent,CKEditorModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  public Editor = ClassicEditor;
  postForm: FormGroup=this.fb.group({});
  imageUrl: string | ArrayBuffer | null = null;
  categorys : Category[]=[]
  constructor(private fb: FormBuilder, private service:Services) {}

  ngOnInit() {

this.getCategory()
    this.postForm = this.fb.group(
      {
      title: '',
      avatar:'',
      category: 'địa điểm',
      content: '<p>nhập nội dung</p>'
     }
  );
  }

  getCategory(){
    this.service.getAllCategory('http://localhost:3000/category/getAll')
    .subscribe((data)=>{
        this.categorys=data
    })
  }

  createPost() {
    const postData: Post = this.postForm.value;
    this.service.addPost('http://localhost:3000/post/add', postData)
    .subscribe(
      (response) => {
        console.log('Post created successfully', response);
      },
    );
  }

// onFileSelected(event:any){
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files[0]){
//     const file :File = input.files[0]

//     this.postForm.patchValue({avatar:file})
//     console.log(this.postForm.value)
//   }else {
//     console.error('No file selected or input.files is undefined');
//   }

// }





}
