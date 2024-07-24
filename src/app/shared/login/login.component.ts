import { Component } from '@angular/core';
import { ApiUserService } from '../../user/api-user.service';
import { FormBuilder,FormGroup,ReactiveFormsModule , Validators} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { CommonModule } from '@angular/common';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NotificationDialogComponent,ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private apiUser:ApiUserService, private fb:FormBuilder, private router:Router, private autheservice:AuthserviceService){}

  signupform:FormGroup= this.fb.group({})
  signinform:FormGroup= this.fb.group({})
  focusStateSighIn:{[key:string]:boolean}={}
  focusStateSighUp:{[key:string]:boolean}={}

  
  // dành cho component thông báo
	showDialog: boolean = false;
	notificationMessage: string = '';
	linkrouter:string=''

  ngOnInit(){
    const logbox= document.querySelector('.logbox')
    const loginlink= document.querySelector('.login-link')
    const registorlink= document.querySelector('.registor-link')

    registorlink?.addEventListener('click', ()=>{
      logbox?.classList.add('active')
    })


    loginlink?.addEventListener('click', ()=>{
      logbox?.classList.remove('active')
    })

    this.signupform=this.fb.group(
      {
        name:['', [Validators.required]],
        username:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(6)]]
      }
    )

    this.signinform=this.fb.group(
      {
        username: ['', [Validators.required, Validators.email]],  // Yêu cầu nhập email và phải đúng định dạng email
        password: ['', [Validators.required, Validators.minLength(6)]]  // Yêu cầu nhập mật khẩu và phải ít nhất 6 ký tự
      }
    )

    // đưa các thuộc tính vào biến focusStateSighUp
    Object.keys(this.signupform.controls).forEach(key=>{
      this.focusStateSighUp[key]=false
    });

      // đưa các thuộc tính vào biến focusStateSighIn
      Object.keys(this.signinform.controls).forEach(key=>{
        this.focusStateSighIn[key]=false
      });


  }

  // dùng cho form đăng ký
  OnFocusSignUp(field:string){
    this.focusStateSighUp[field]=true
  }

  OnBlurSignUp(field:string){
    this.focusStateSighUp[field]=false
  }

  // dùng cho form đăng nhập
  OnFocusSighIn(field:string){
    this.focusStateSighIn[field]=true
  }

  OnBlurSighIn(field:string){
    this.focusStateSighIn[field]=false
  }


  

  onSubmitSignUp() {
    // Đánh dấu tất cả các control là 'touched' để kích hoạt kiểm tra lỗi
    Object.keys(this.signupform.controls).forEach(field => {
      const control = this.signupform.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    if(this.signupform.valid){
      this.createUser()
    }else{
      alert('dữ liệu không hợp lệ')
    }
  }

  createUser(){
    const postdata= this.signupform.value
    this.apiUser.addUser('http://localhost:3000/user/add', postdata)
    .subscribe((response)=>{
       // Kiểm tra xem response có phải là một đối tượng User hợp lệ không
       if (response && response.username && response._id) {
        console.log(response)
          alert('tạo tài khoản thành công')
      } else {
        console.log(response)
        alert('thất bại')
      }
   
    })
  }

  onSubmitSignIn(){
    Object.keys(this.signinform.controls).forEach(field=>{
      const control=this.signinform.get(field)
      control?.markAsTouched({onlySelf:true})
    })

    if(this.signinform.valid){
      this.logindata()
    }else{
      alert('dữ liệu không hợp lệ')
    }
  }

  logindata(){
    const logindata= this.signinform.value
    this.apiUser.login('http://localhost:3000/auth/login',logindata)
    .subscribe((reponse)=>{

      //hiện lỗi sai tk/mk
      if(typeof reponse !=='object'){
        this.notificationMessage=reponse
        this.showDialog=true
        this.linkrouter=''
      }else{
          // lưu token
          const token= reponse.accessToken
          this.autheservice.setToken(token)

          // xác minh người dùng và cho và route tương ứng
          const user= reponse.user
          if(user.admin){
          this.router.navigateByUrl('/post/listPost')
          }else{
          this.router.navigateByUrl('/home/user')
          }
      }


    })
  }

}
