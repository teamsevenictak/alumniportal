import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //server_address : String = `api`;
  server_address : String = `http://localhost:5000`;
  constructor(public http:HttpClient) { }
  userVerify(user:any){
    return this.http.post<any>(`${this.server_address}/login`,user);
  }
  loggedIn()
  {
    return !!localStorage.getItem('token');
  }
  isalumni(){
    var _finaldata      = this.getLoggedUserRole();
      if(_finaldata.user_role=='user_alumni'){
        return true
      }else return false;
  }
  getToken(){
    return localStorage.getItem('token');
  }
  register(newuser:any) {
    return this.http.post(`${this.server_address}/register`,{user:newuser});    
  }
  HaveAdminAccess(){
    var _finaldata      = this.getLoggedUserRole();
      if(_finaldata.user_role=='user_admin'){
        return true
      }else return false;
      
    }
  HaveEmployeeAcess(){
    var _finaldata      = this.getLoggedUserRole();
      if(_finaldata.user_role=='user_faculty'){
        return true
      }else return false;
  }
  getLoggedUserRole(){
    var loggedintoken   = localStorage.getItem('token');
    if(loggedintoken!=null){
      var extractedtoken  = loggedintoken.split('.')[1];
      var _atobdata       = atob(extractedtoken);
      var _finaldata      = JSON.parse(_atobdata);
      return _finaldata;
    }else return false;
  }
  getLoggedUserID(){
    var loggedintoken   = localStorage.getItem('token');
    if(loggedintoken!=null){
      var extractedtoken  = loggedintoken.split('.')[1];
      var _atobdata       = atob(extractedtoken);
      var _finaldata      = JSON.parse(_atobdata);
      return _finaldata.id;
    }else return false;
  }
}
