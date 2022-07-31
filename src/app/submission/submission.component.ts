import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JobpostingService } from '../jobposting.service';
import { applcationModel } from './applcationModel';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  constructor(public jobpostingService: JobpostingService,public _auth:AuthService,private router:Router) { }
  application: applcationModel[] |any;
 isverified =false;
  ngOnInit(): void {
    this.jobpostingService.getApplications().subscribe((data)=>{
      this.application = JSON.parse(JSON.stringify(data));
      
      console.log(this.application);
    })
  }
  sendToEmployer(application:any){
    var  AppId = application._id;
    this.jobpostingService.updateById(AppId).subscribe((data)=>{
      if(data!=null){
        this.isverified=true;
      }
         // this.router.navigate(['/jobdetail']); 
    })
   }

}
