import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class AuthComponentComponent implements OnInit {
  screen: any = 'signin';
  formData: FormGroup;
  isLoading: boolean = false;
  constructor(private fb:FormBuilder,private router: Router, private auth:AuthService, private navCtrl: NavController, private toastController: ToastController) {
    this.formData = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    });
   
  }
  testAccount = {
    email: 'yourmail@gmail.com',
    password: '1234',
    balance: 100000,
    name:"Đoàn Cao Nhật Hạ"
  }; 

  // constructor(private navCtrl: NavController, private toastController: ToastController) {}

  ngOnInit(): void {};

  change(event: any){
    this.screen = event;
  }

  login(){
    var formData: any = new FormData();
    if(this.formData.valid){
      this.isLoading = true
      formData.append('email', this.formData.get('email')?.value);
      formData.append('password', this.formData.get('password')?.value);
      console.log(this.formData)
      this.auth.userLogin(formData).subscribe((data:any)=>{
        console.log(data);
      });
    }  

    if (this.formData.get('email')?.value === this.testAccount.email && this.formData.get('password')?.value === this.testAccount.password) {
      // Đăng nhập thành công, chuyển đến trang khác hoặc thực hiện hành động cần thiết
      // Ví dụ: Chuyển đến trang sau khi đăng nhập thành công
      // this.navCtrl.navigateForward('/home');

      // Hiển thị thông báo đăng nhập thành công
      this.presentToast('Đăng nhập thành công!');
      const params : NavigationExtras = {
        queryParams: {
          user: JSON.stringify(this.testAccount)
        }
      }
      // console.log(params)
      this.router.navigate(['home'],params)

    } else {
      // Hiển thị thông báo đăng nhập không thành công
      this.presentToast('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  // register(){
  //   var formData: any = new FormData();
  //   if(this.formData.valid){
  //     this.isLoading = true
  //     formData.append('name', this.formData.get('name')?.value);
  //     formData.append('email', this.formData.get('email')?.value);
  //     formData.append('password', this.formData.get('password')?.value);
  //     console.log(this.formData)
  //     this.auth.userRegister(formData).subscribe((data:any)=>{
  //       console.log(data);
  //     });
  //   }  
  // }

}
