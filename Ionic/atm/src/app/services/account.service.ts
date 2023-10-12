import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { User } from 'model/user';


@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private storageService: StorageService) { }

  addAccount(email: string, password: string): any {
    this.storageService.set(email, { email: email, password: password });
  }

  getAccount(email: string): any {
    return this.storageService.get(email);
  }

  getAllAccount(): any {
    return this.storageService.getAll();
  }

  deleteAccount(email: string): any {
    return this.storageService.delete(email);
  }
}