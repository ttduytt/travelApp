import { Component } from '@angular/core';
import { HeaderUserComponent } from '../header-user/header-user.component';
import { CommonModule } from '@angular/common';
import { Image } from '../../shared/model/imageModel';
import { Services } from '../../admin/service';
import { ApiUserService } from '../api-user.service';
@Component({
  selector: 'app-libary-image',
  standalone: true,
  imports: [HeaderUserComponent,  CommonModule],
  templateUrl: './libary-image.component.html',
  styleUrl: './libary-image.component.scss'
})
export class LibaryImageComponent {
    overlay:any
    sopx:number=0
    listImages: Image []=[]
    imgUserChoose = '' 
    numberImgChoose=0
    likedImages: string[] = [];

    constructor (private service:Services, private apiuser:ApiUserService){}

    ngOnInit(){
      this.getlistimage()
    }

    getlistimage(){
      this.service.getImages('http://localhost:3000/image/getAll')
      .subscribe(data=>{
        this.listImages=data
      })
    }

    closeOverlay(){
      this.overlay =false
    }

    // updateView(id:any){
    //   this.apiuser.updateView(`http://localhost:3000/image/updateview/${id}`)
    //   .subscribe(data=>{
    //     this.getlistimage()
    //   })
    // }

    openOverlay(event:any, index:number){
      this.overlay =true
      const img= event.target as HTMLElement
      var linkimg= img.getAttribute('src')
      linkimg ? this.imgUserChoose=linkimg: '' 

      this.numberImgChoose=index
      
    }

   

    slideRight(){
      if(this.numberImgChoose<this.listImages.length-1){
        this.numberImgChoose+=1
     
        var linkimg= this.listImages[this.numberImgChoose].image
        this.imgUserChoose=linkimg
      }
  
    }

    slideLeft(){
      
     if(this.numberImgChoose>0){
      this.numberImgChoose-=1
     
     var linkimg= this.listImages[this.numberImgChoose].image
     this.imgUserChoose=linkimg
     }
    }


    
  updateLike(idImg:any, event:Event){
   event.stopPropagation()
   var arrLikeimageString= sessionStorage.getItem('likedImages')
    if(arrLikeimageString){
      var arrLikeimage= JSON.parse(arrLikeimageString)
      if( !arrLikeimage.includes(idImg) ){
        this.apiuser.updateLike(`http://localhost:3000/image/updateLike/${idImg}`)
        .subscribe(data=>{
           this.getlistimage()
  
           // thêm id bài viết vào mảng likedimages
            this.likedImages.push(idImg);
            sessionStorage.setItem('likedImages', JSON.stringify(this.likedImages))
  
      
        })
      }

    }else{
      this.apiuser.updateLike(`http://localhost:3000/image/updateLike/${idImg}`)
      .subscribe(data=>{
         this.getlistimage()

         // thêm id bài viết vào mảng likedimages
          this.likedImages.push(idImg);
          sessionStorage.setItem('likedImages', JSON.stringify(this.likedImages))

    
      })
    }

  };


}
