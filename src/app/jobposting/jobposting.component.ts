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

  jobItems = new JobPostingModel("","","","","",0,"","","","","");

  constructor(public jobpostingService : JobpostingService, public router:Router) { }
  jobadded: String='';
  successmsg:String='';
  success : boolean=false;
  ngOnInit(): void {
  }
   NewJobs(){
    this.jobpostingService.addJobs(this.jobItems).
    subscribe((data)=>{
      var jopadded = JSON.parse(JSON.stringify(data));
      this.successmsg = jopadded.message;
      this.success = true;
    });
    alert('New job added');
    this.router.navigate(['/']);

   }
  

}
