import { Component, OnInit } from '@angular/core';
import { JobPostingModel } from '../home/jobposting.model';
import { JobpostingService } from '../jobposting.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css']
})
export class JoblistingComponent implements OnInit {
  postajob : JobPostingModel [] |any;
  verifiedpost:Boolean =false;
  constructor(public jobpostingService: JobpostingService, public router:Router,public _auth:AuthService) { }


  ngOnInit(): void {
    this.jobpostingService.getJobs().subscribe((data)=>{
      this.postajob=JSON.parse(JSON.stringify(data));
    })
  }
  viewDetail(jobposting:any){
    var  jobId = jobposting._id;
    this.jobpostingService.getJobById(jobId).subscribe((data)=>{
      var jobDetail = JSON.parse(JSON.stringify(data));
      this.jobpostingService.jobDetails = jobDetail; 
      this.jobpostingService.selectedId = jobId;
      localStorage.setItem('jobID',jobId);
      this.router.navigate(['/jobdetail']); 
    })
   }
   verifyPost(post:any)
   {
    var  PostId = post._id;
    this.jobpostingService.verifyById(PostId).subscribe((data)=>{
      var verified = JSON.parse(JSON.stringify(data));
      if(verified.verify == 'Post sent successfully')
      {
        this.verifiedpost = true;
      }
    })
   }
}
