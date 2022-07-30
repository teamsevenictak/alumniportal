import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class JobpostingService {
  jobDetails:any;
  server_address : String = `http://localhost:5000`;// `api`;
  userId : String='';
  uploadProgress :Number=0;
  uploadSub!: Subscription;
  selectedId: string ='';

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
  getApplications(){
    return this.http.get(`${this.server_address}/getapplicatins`);
  }
  updateById(Appid:any){
    return this.http.put(`${this.server_address}/updateapplicatin`,{Appid:Appid});
  }
  upload(file:File,application:any)  {
    var formData = new FormData();
    formData.append("resume", file);
    formData.append("name", application.name);
    formData.append("filelink", application.filelink);
    formData.append("alumniID",  this._auth.getLoggedUserID());
    //var  jobId = localStorage.getItem('jobID');
    formData.append("jobId", this.selectedId);
    return this.http.post(`${this.server_address}/resume-upload`, formData, {
      reportProgress: true,
      observe: 'events'
  })
  .pipe(
      //finalize(() => this.reset())
  );
    
  }
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub.unsubscribe();
  }
}
