import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  server_address : String = `api`;
  constructor(public http: HttpClient) { }
  sendEmail(newContact:any){
    return this.http.post(`${this.server_address}/sendEmail`,{visitor:newContact});
  }
}
