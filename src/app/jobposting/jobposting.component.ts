import { Component, OnInit } from '@angular/core';
import { JobPostingModel } from '../home/jobposting.model';
import { JobpostingService } from '../jobposting.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-jobposting',
  templateUrl: './jobposting.component.html',
  styleUrls: ['./jobposting.component.css']
})
export class JobpostingComponent implements OnInit {

  title:String = "Post a New Job";
   jobItems = new JobPostingModel("","","","","",0,"","","","","","",0);
  constructor(public jobpostingService : JobpostingService,private _auth:AuthService, public router:Router) { }
  jobadded: String='';
  successmsg:String='';
  success : boolean=false;
   today :Date= new Date();
  userId = this._auth.getLoggedUserID();
  ngOnInit(): void {
    var dd = this.today.getDate();
    var mm = this.today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
    var yyyy = this.today.getFullYear();    
    var min_today = yyyy+'-'+mm+'-'+dd;
    //document.getElementById("lastdate").setAttribute("min", min_today);
    //this.userId = this._auth.getLoggedUserID();

  }
 // console.log(userId: any);
 

   NewJobs(){
    this.jobpostingService.addJobs(this.jobItems).
    subscribe((data)=>{
      var jopadded = JSON.parse(JSON.stringify(data));
      this.successmsg = jopadded.message;
      this.success = true;
    });
    
    this.router.navigate(['/joblisting']);

   }
  

}
