import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 


@Injectable({
  providedIn: 'root'
})
export class JobpostingService {

  constructor(public http: HttpClient) { }

  getJobs(){
    return this.http.get('http://localhost:3000/postajob')
  }

  addJobs(item:any){
    return this.http.post('http://localhost:3000/addJob',{item})
    .subscribe(data=>{console.log(data)})
  }
}
