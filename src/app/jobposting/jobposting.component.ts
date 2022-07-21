import { Component, OnInit } from '@angular/core';
import { JobPostingModel } from '../home/jobposting.model';
import { JobpostingService } from '../jobposting.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-jobposting',
  templateUrl: './jobposting.component.html',
  styleUrls: ['./jobposting.component.css']
})
export class JobpostingComponent implements OnInit {

  title:String = "Post a New Job";

  jobItems = new JobPostingModel("","","","","","","","","");

  constructor(public jobpostingService : JobpostingService, public router:Router) { }

  ngOnInit(): void {
  }
   NewJobs(){
    this.jobpostingService.addJobs(this.jobItems);
    alert('New job added');
    this.router.navigate(['/']);

   }
  

}
