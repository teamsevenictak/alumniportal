import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JobPostingModel } from '../home/jobposting.model';
import { JobpostingService } from '../jobposting.service';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})
export class JobdetailComponent implements OnInit {
  
  jobItems = new JobPostingModel("","","","","",0,"","","","","");
  selectedId  :string='';
  jobId       :string='';
  constructor(public jobpostingService: JobpostingService,public _auth:AuthService) { }
  today :Date= new Date();
  lastDate:Date= new Date();
  isCutoffOver :Boolean=false;
  ngOnInit(): void {
    this.jobItems = this.jobpostingService.jobDetails;
    if(this.jobItems==undefined){
       this.jobId = this.jobpostingService.selectedId;//localStorage.getItem('jobID');
      this.jobpostingService.selectedId = this.jobId;
      this.jobpostingService.getJobById(this.jobId).subscribe((data)=>{
        
        var jobDetail = JSON.parse(JSON.stringify(data));
        this.lastDate = jobDetail.lastDate;
        console.log(this.lastDate);
        this.jobItems = jobDetail;      
        if(this.lastDate<this.today)   {
          this.isCutoffOver = true;
        }
      });
      
    }console.log(this.today+'last'+this.lastDate+'over'+this.isCutoffOver);
  }
 

}
