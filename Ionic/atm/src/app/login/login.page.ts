import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { User } from 'model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class InforComponent implements OnInit {
  private subscription: Subscription = new Subscription(); // khai báo: subscription
  @ViewChild('email') email: any; // khai báo: email
  screen: any = 'signin';
  formData!: FormGroup;
  isLoading: boolean = false;
  check = false;
  users: string[] = [];
  newAccount = '';
  accountToDelete = '';
  data = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private auth: AuthService,
    private toastController: ToastController
  ) {
    // localStorage.removeItem('account');
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

  }
 
  ngOnInit(): void { 
    this.formData = this.fb.group({
      name: '',
      email: '',
      password: ''
    });
  }

  // ionViewDidLoad(): void {
  //   // sau 0.5s tự động focus vào field email
  //   setTimeout(() => {
  //     this.email.setFocus();
  //   }, 500);
  // }

  reset(): void {
    this.formData.reset();
  }

  // ionViewDidEnter() {
  //   this.users = this.accountService.getAllAccount();
  // }

  change(event: any) {
    this.screen = event;
  }

  login() {
    // var formData: any = new FormData();
    // // if (this.formData.valid) {
    // //   this.isLoading = true
    // //   formData.append('email', this.formData.get('email')?.value);
    // //   formData.append('password', this.formData.get('password')?.value);
    // //   console.log(this.formData)
    // //   this.auth.userLogin(formData).subscribe((data: any) => {
    // //     console.log(data);
    // //   });
    // // }

    // if (this.formData.get('email')?.value === this.formData && this.formData.get('password')?.value === this.formData) {
    //   // Đăng nhập thành công, chuyển đến trang khác hoặc thực hiện hành động cần thiết
    //   // Ví dụ: Chuyển đến trang sau khi đăng nhập thành công

    //   // Hiển thị thông báo đăng nhập thành công
    //   this.presentToast('Đăng nhập thành công!');
    //   const params: NavigationExtras = {
    //     queryParams: {
    //       user: JSON.stringify(this.formData)
    //     }
    //   }
    //   // console.log(params)
    //   this.router.navigate(['/home'], params)

    // } else {
    //   // Hiển thị thông báo đăng nhập không thành công
    //   this.presentToast('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.');
    // }

    let acc = this.formData.get(['email'])?.value; // Account No. entered
    let pass = this.formData.get(['password'])?.value; // Paasword No. entered
    this.accountService.getAccount(acc).then(async (data: any) => {
      if (data) {
        if (acc && pass && this.formData.get(['password'])?.value === data['password']){
          // Hiển thị thông báo đăng nhập thành công
          this.presentToast('Đăng nhập thành công!');
          // const params: NavigationExtras = {
          //       queryParams: {
          //         user: JSON.stringify(this.formData)
          //       }
          //     }
              // console.log(params)
              this.router.navigate(['/home'])
        }else
          this.presentToast('Đăng nhập không thành công. Vui lòng kiểm tra lại mật khẩu.');
      }
      else
        this.presentToast('Tài khoản không tồn tại. Vui lòng kiểm tra lại tài khoản.');

    });
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
    if (this.data) {
    let result = this.accountService.addAccount(this.formData.get(['email'])?.value, this.formData.get(['password'])?.value)
    this.showAlert('Thêm tài khoản', 'Thêm tài khoản thành công')
    }else{
      this.showAlert('Thêm tài khoản', 'Tài khoản đã tồn tại')
    }
  }

  checkAccount() {
    if (this.accountService.getAccount('email') != null) {
      this.check = true;
      return this.check;
    }
  }

  async delete(account: string) {
    let result = this.accountService.deleteAccount(this.formData.get(['email'])?.value);
    this.showAlert('Xoá tài khoản', 'Xoá tài khoản thành công ')
  }

  async all() {
    let allAcc = this.accountService.getAllAccount();
    let s = '';
    for (let i = 0; i < allAcc.length; i++) {
      s += i+1+'. '+ allAcc[i]['email']+' - ' + allAcc[i]['password'] +'\n\t';
    }  
    this.showAlert('Tất cả tài khoản', '' + s)
  }

  async showAlert(title: string, msg: string) {
    this.alertController.create({
      header: title,
      // subHeader: 'Subtitle for alert',
      message: msg,
      buttons: ['OK']
    }).then(res => {
      // this.router.navigate(['/login'])

      res.present();

    });
  }
}
