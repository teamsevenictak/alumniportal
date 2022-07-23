import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 


@Injectable({
  providedIn: 'root'
})
export class JobpostingService {
  jobDetails:any;
  server_address : String = `api`;

  constructor(public http: HttpClient) { }

  getJobs(){
    return this.http.get(`${this.server_address}/postajob`)
  }

  addJobs(item:any){
    return this.http.post(`${this.server_address}/addJob`,{item});
    
  }
  getJobById(JobId: any){
    return this.http.get(`${this.server_address}/jobdetail/`+JobId);
  }
}
