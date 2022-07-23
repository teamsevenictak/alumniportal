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
  constructor(public jobpostingService: JobpostingService,public _auth:AuthService) { }

  ngOnInit(): void {
    this.jobItems = this.jobpostingService.jobDetails;
  }
 

}
