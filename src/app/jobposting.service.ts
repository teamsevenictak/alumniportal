import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class JobpostingService {
  jobDetails:any;
  server_address : String = `http://localhost:5000`;// `api`;
  userId : String='';

  constructor(public http: HttpClient,private _auth:AuthService) { }

  getJobs(){
    return this.http.get(`${this.server_address}/postajob`)
  }
 getJobsByUser(){
  return this.http.get(`${this.server_address}/postsbyuser`);
 }
  addJobs(item:any){
    this.userId  = this._auth.getLoggedUserID();
    item.userId =  this.userId;
    console.log(item);
    return this.http.post(`${this.server_address}/addJob`,{item});
    
  }
  getJobById(JobId: any){
    return this.http.get(`${this.server_address}/jobdetail/`+JobId);
  }
  upload(file:File)  {
    const formData = new FormData();
    formData.append("resume", file);
    return this.http.post("/resume-upload", formData, {
      reportProgress: true,
      observe: 'events'
  })
  .pipe(
      //finalize(() => this.reset())
  );
    
  }
}
