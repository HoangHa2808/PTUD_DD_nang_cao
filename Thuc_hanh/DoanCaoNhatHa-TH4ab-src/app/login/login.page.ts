import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { User } from 'model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class InforComponent implements OnInit {
  testAccount = {
    name: 'Đoàn Cao Nhật Hạ',
    email: "yourmail@gmail.com",
    password: '1234',
    balance: 10000000,
  }
  screen: any = 'signin';
  formData: FormGroup;
  isLoading: boolean = false;
  check = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private alertController: AlertController, private formBuilder: FormBuilder, private accountService: AccountService, private auth: AuthService, private toastController: ToastController) {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { };

  change(event: any) {
    this.screen = event;
  }

  login() {
    var formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true
      formData.append('email', this.formData.get('email')?.value);
      formData.append('password', this.formData.get('password')?.value);
      console.log(this.formData)
      this.auth.userLogin(formData).subscribe((data: any) => {
        console.log(data);
      });
    }

    if (this.formData.get('email')?.value === this.testAccount.email && this.formData.get('password')?.value === this.testAccount.password) {
      // Đăng nhập thành công, chuyển đến trang khác hoặc thực hiện hành động cần thiết
      // Ví dụ: Chuyển đến trang sau khi đăng nhập thành công
      // this.navCtrl.navigateForward('/home');

      // Hiển thị thông báo đăng nhập thành công
      this.presentToast('Đăng nhập thành công!');
      const params: NavigationExtras = {
        queryParams: {
          user: JSON.stringify(this.testAccount)
        }
      }
      // console.log(params)
      this.router.navigate(['home'], params)

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

  add() {
    if (!(this.formData.get('email')?.value === this.testAccount.email && this.formData.get('password')?.value === this.testAccount.password && this.checkAccount())) {
     
        this.accountService.addAccount(this.testAccount.email, this.testAccount.password)
          .then(() => {
            this.showAlert('Thêm người dùng', 'Thêm tài khoản thành công');
          });
      }
      else {
        this.showAlert('Thêm người dùng', 'Tài khoản đã tồn tại');
      }
    }


  checkAccount() {
    if (this.accountService.getAccount('email') != null) {
      this.check = true;
      return this.check;
    }
  }

  async delete() {
    if (this.formData.get('email')?.value === this.testAccount.email && this.formData.get('password')?.value === this.testAccount.password) {
      this.accountService.getAccount(this.testAccount.email)
        .then(() => {
          this.showAlert('Xoá tài khoản', 'Xoá tài khoản ' + this.testAccount.name + ' thành công');
        });
    }
    else {
      this.showAlert('Xoá tài khoản', 'Đã xảy ra lỗi!');
    }
  }

  async all() {
    // const alert = await this.alertController.create({
    //   header: 'Tất cả tài khoản',
    //   subHeader: this.testAccount.name,
    //   buttons: ['OK'],
    // });
    // await alert.present();
    this.showAlert('Tất cả tài khoản', '1.' + this.testAccount.name)
  }

  async showAlert(title: string, msg: string) {
    this.alertController.create({
      header: title,
      // subHeader: 'Subtitle for alert',
      message: msg,
      buttons: ['OK']
    }).then(res => {
      this.router.navigate(['/login'])

      res.present();

    });
  }
}
