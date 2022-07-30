import { Component, OnInit } from '@angular/core';
import { JobPostingModel } from './jobposting.model';
import { JobpostingService } from '../jobposting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
      this.jobpostingService.selectedId = jobId;
      localStorage.setItem('jobID',jobId);
      this.router.navigate(['/jobdetail']); 
    })
   }

}
