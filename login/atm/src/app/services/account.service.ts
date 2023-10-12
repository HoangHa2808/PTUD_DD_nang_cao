import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { User } from 'model/user';


@Injectable({
  providedIn: 'root'
  })
  export class AccountService {

    public users: User[] = [];
    constructor(private storageService: StorageService) {}

     async addAccount(email: string, password: string): Promise<void>{
    this.storageService.set('email', email);
    this.storageService.set('password', password);
  }

  async getAccount(email: string): Promise<void>{
    return this.storageService.get(email);
  }

  // getAllAccount(){
  //   const items = this.storageService.getAll();
  //   items.forEach((e)=>{
  //     this.users.push(e);
  //   });
  //   console.log(this.users.length);
  // }
  }