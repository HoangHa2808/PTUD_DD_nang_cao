import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.API_URL;
  constructor(private http:HttpClient) {}

  userLogin(req: any){
    return this.http.post(`${this.API_URL}login`,req);
  }

  userRegister(req: any){
    return this.http.post(`${this.API_URL}register`,req);
  }

  public deleteAccount(){
    return this.http.delete(this.API_URL)
  }

  public async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }
  // public async get(key: string): Promise<void> {
  //   localStorage.setItem(key, JSON.stringify(value));
  // }
  
}
