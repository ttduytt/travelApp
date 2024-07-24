import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Services } from '../../service';
import { Image } from '../../../shared/model/imageModel';
import { CommonModule } from '@angular/common';
import { image } from '@cloudinary/url-gen/qualifiers/source';
@Component({
  selector: 'app-list-image',
  standalone: true,
  imports: [HeaderComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './list-image.component.html',
  styleUrl: './list-image.component.scss'
})
export class ListImageComponent {
  constructor(private fb:FormBuilder, private service:Services){}

  listImages:Image []=[]
  postForm: FormGroup= this.fb.group({})
  isdark:boolean=false
  isclose:boolean=false
  idImageDelete=''
  file :File | null=null
  isLoading=false
  ngOnInit(){
   this.getAllimage()

    this.postForm=this.fb.group({
      title:['',[Validators.required]],
      image:['',[Validators.required]]
    })
  }

  onSubmitForm(){
    if(this.postForm.valid){
      this.upLoadAndGetUrl()
    }else{
      alert('dữ liệu không hợp lệ vui lòng kiểm tra lại')
    }
  }

  OpenModal(id:string){
    const modal= document.querySelector('#myModal') as HTMLElement
    modal.style.display='block'
  
    this.idImageDelete=id
    console.log(this.idImageDelete)
  }
  
  closeModal(){
    const modal= document.querySelector('#myModal') as HTMLElement
    modal.style.display='none'
    this.idImageDelete=''
  }

  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark=data.dark
  }


  createImage(){
    const data= this.postForm.value
    this.service.createImage('http://localhost:3000/image/add', data)
    .subscribe(reponse=>{
      console.log(reponse)
      this.getAllimage()
    })
  }

  getAllimage(){
    this.service.getImages('http://localhost:3000/image/getAll')
    .subscribe(data=>{
      this.listImages=data
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

  deleteImage(id:any){
    this.service.deleteUser(`http://localhost:3000/image/delete/${id}`)
    .subscribe(data=>{
      this.closeModal()
      this.getAllimage()
    })
  }

  onFileSelected(event:any){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]){
      this.file= input.files[0]
      this.postForm.patchValue({image:this.file})
    
    }else {
      console.error('No file selected or input.files is undefined');
    }
  
  }

  upLoadAndGetUrl(){
    if(this.file){
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('upload_preset', 'ml_default'); 
      this.isLoading=true
      this.service.UploadImg('https://api.cloudinary.com/v1_1/dua4jdiah/upload', formData)
      .subscribe((response:any)=>{
        this.file=response.secure_url
        this.postForm.patchValue({image:this.file})
  
        // gọi hàm thêm nếu upload ảnh thành công
        this.createImage()
        this.isLoading=false
      })
    }
   }
  


}
