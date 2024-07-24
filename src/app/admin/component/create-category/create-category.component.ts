import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Services } from '../../service';
import { Category } from '../../../shared/model/categoryModel';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [HeaderComponent,ReactiveFormsModule,CommonModule,NgxPaginationModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {
  constructor(private fb: FormBuilder,private service:Services){}
  postForm: FormGroup=this.fb.group({});
  categorys: Category[]=[]
  page: number = 1;

  isdark:boolean=false
  isclose:boolean=false
  idCategoryDelete=''

  ngOnInit(){

    this.getAllCate()

    this.postForm = this.fb.group(
      {
      category: ['',[Validators.required]],
     }
  );
}


OpenModal(id:string){
  const modal= document.querySelector('#myModal') as HTMLElement
  modal.style.display='block'

  this.idCategoryDelete=id
  console.log(this.idCategoryDelete)
}

closeModal(){
  const modal= document.querySelector('#myModal') as HTMLElement
  modal.style.display='none'
  this.idCategoryDelete=''
}


onSubmitForm(){
  if(this.postForm.valid){
    this.createCategory()
  }else{
    alert('dữ liệu không hợp lệ vui lòng kiểm tra lại')
  }
}

  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark=data.dark
  }

  getAllCate(){
    this.service.getAllCategory('http://localhost:3000/category/getAll')
    .subscribe((data)=>{
        this.categorys=data
    })
  }

  createCategory(){
    const data:Category= this.postForm.value
    this.service.addCategory('http://localhost:3000/category/add', data)
    .subscribe((response)=>{
      console.log('Post created successfully', response);
      this.getAllCate()
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

  deleteCategory(id:string){
    this.service.deleteUser(`http://localhost:3000/category/delete/${id}`)
    .subscribe((response)=>{
      this.closeModal()
      this.getAllCate()
    })
  }


}
