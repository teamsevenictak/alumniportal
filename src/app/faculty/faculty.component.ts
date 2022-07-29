import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobPostingModel } from '../home/jobposting.model';
import { JobpostingService } from '../jobposting.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  postajob : JobPostingModel [] |any;
  constructor(public jobpostingService: JobpostingService, public router:Router) { }

  ngOnInit(): void {
    this.jobpostingService.getJobsByUser().subscribe((data)=>{
      this.postajob=JSON.parse(JSON.stringify(data));
    })
  }
  viewDetail(jobposting:any){
    var  jobId = jobposting._id;
    this.jobpostingService.getJobById(jobId).subscribe((data)=>{
      var jobDetail = JSON.parse(JSON.stringify(data));
      this.jobpostingService.jobDetails = jobDetail; 
      
      localStorage.setItem('jobID',jobId);
      this.router.navigate(['/jobdetail']); 
    })
   }
}
