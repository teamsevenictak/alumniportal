import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server_address :  String = `api`;
  constructor(public http:HttpClient) { }
  userVerify(user:any){
    return this.http.post<any>(`${this.server_address}/login`,user);
  }
  loggedIn()
  {
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  register(newuser:any) {
    return this.http.post(`${this.server_address}/register`,{user:newuser});    
  }
}
