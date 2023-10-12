import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  user = {
    name: 'Đoàn Cao Nhật Hạ',
    email: 'yourmail@gmail.com',
    balance: null

  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      // console.log(params)
      if (params && params["user"]) {
        this.user = JSON.parse(params['user']);
        console.log(this.user)
      }
    });
  
  }

  ngOnInit() {}

  infor(){
    this.router.navigate(['/infor'])

  }

  withdraw() {
    this.router.navigate(['/withdraw'])
  }

  logout(){
    this.router.navigate(['/login'])
  }

}
