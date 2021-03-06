import { Component, OnInit } from '@angular/core';
import { JobPostingModel } from '../home/jobposting.model';
import { JobpostingService } from '../jobposting.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css']
})
export class JoblistingComponent implements OnInit {
  postajob : JobPostingModel [] |any;
  constructor(public jobpostingService: JobpostingService, public router:Router) { }


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
      this.router.navigate(['/jobdetail']); 
    })
   }
}
