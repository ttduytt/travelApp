import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Services } from '../../service';
import { Category } from '../../../shared/model/categoryModel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [HeaderComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {
  constructor(private fb: FormBuilder,private service:Services){}
  postForm: FormGroup=this.fb.group({});
  categorys: Category[]=[]
  ngOnInit(){

    this.getAllCate()

    this.postForm = this.fb.group(
      {
      category: '',
     }
  );
  }

  getAllCate(){
    this.service.getAllCategory('http://localhost:3000/category/getAll')
    .subscribe((data)=>{
        this.categorys=data
    })
  }

  createCategory(){
    const data:Category= this.postForm.value
    console.log(data)
    this.service.addCategory('http://localhost:3000/category/add', data)
    .subscribe((response)=>{
      console.log('Post created successfully', response);
      this.getAllCate()
    })
  }
}
