import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {

  user = {
    name: 'Đoàn Cao Nhật Hạ',
    email: "yourmail@gmail.com",
    balance: 100000

  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params && params["user"]) {
        this.user = JSON.parse(params['user']);
        console.log(this.user)
      }
    });
   }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['/home'])
  }

}
