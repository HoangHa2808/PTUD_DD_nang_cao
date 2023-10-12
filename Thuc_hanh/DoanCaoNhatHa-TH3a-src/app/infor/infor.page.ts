import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-infor',
  templateUrl: './infor.page.html',
  styleUrls: ['./infor.page.scss'],
})

export class InforPage implements OnInit {

  user = {
    name: 'Đoàn Cao Nhật Hạ',
    email: "yourmail@gmail.com",
    password: '1234',
    balance: 100000,
  }

  check = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params && params["user"]) {
        this.user = JSON.parse(params['user']);
        console.log(this.user)
      }
    });
  }

  ngOnInit(): void {    
  }

  back(): void {
    this.router.navigate(['/home']);
  }

}
