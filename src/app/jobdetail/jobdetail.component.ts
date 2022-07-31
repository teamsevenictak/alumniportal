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
  
  jobItems = new JobPostingModel("","","","","",0,"","","","","","",1);
  selectedId  :string='';
  jobId       :string='';
  emplyId     :string='';  
  constructor(public jobpostingService: JobpostingService,public _auth:AuthService) { }
  today :Date= new Date();
  lastDate:Date= new Date();
  isCutoffOver :Boolean=false;
  isApplied:Boolean=false;
  ngOnInit(): void {
    this.jobItems = this.jobpostingService.jobDetails;
    if(this.jobItems==undefined){
      const  jobsID = localStorage.getItem('jobID');
      //this.jobpostingService.selectedId = jobsID;    
      this.jobpostingService.getJobById(jobsID).subscribe((data)=>{        
        var jobDetail = JSON.parse(JSON.stringify(data));
        this.lastDate = jobDetail.lastDate;
        this.jobpostingService.emplyId    =  jobDetail.emplyId;
        this.jobItems = jobDetail; 
       
        const lastDate = new Date(this.lastDate);
        console.log(lastDate.getTime() )     ;
        console.log(this.today.getTime());
        if (lastDate.getTime() < this.today.getTime()){
          this.isCutoffOver = true;
        }
      });
      
    }
    else {
      //const lastDate = new Date(this.jobItems.lastDate);
     
     // console.log(lastDate.getTime());
     // console.log(this.today.getTime());
      //if(lastDate < this.today)
      {

      }
    }
    //check if already applied
    if(this._auth.isalumni()){
      const userId = this._auth.getLoggedUserID();
      const app={
        "postID":this.jobpostingService.selectedId,
        "AlumnId":userId
            } 
      this.jobpostingService.getApplicationById(app).subscribe((data)=>{        
        if(data!=null){
          this.isApplied = true;
        }
      });
    }
    //
  }
 

}