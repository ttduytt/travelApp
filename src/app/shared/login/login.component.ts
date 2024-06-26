import { Component } from '@angular/core';
import { ApiUserService } from '../../user/api-user.service';
import { FormBuilder,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private apiUser:ApiUserService, private fb:FormBuilder, private router:Router, private autheservice:AuthserviceService){}

  signupform:FormGroup= this.fb.group({})
  signinform:FormGroup= this.fb.group({})
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
        name:'',
        username:'',
        password:''
      }
    )

    this.signinform=this.fb.group(
      {
        username:'',
        password:''
      }
    )

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

  logindata(){
    const logindata= this.signinform.value
    this.apiUser.login('http://localhost:3000/auth/login',logindata)
    .subscribe((reponse)=>{
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
    })
  }

}
