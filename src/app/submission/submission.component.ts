import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JobpostingService } from '../jobposting.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  constructor(public jobpostingService: JobpostingService,public _auth:AuthService,private router:Router) { }
  application  = 
  { name : '',
  filelink : '',
  postID   :'',
  AlumnId  :'',
  Dateofsub:'',
  visibility:''
 }
  ngOnInit(): void {
    this.jobpostingService.getApplications().subscribe((data)=>{
      this.application = JSON.parse(JSON.stringify(data));
    })
  }
  sendToEmployer(application:any){
    var  AppId = application._id;
    this.jobpostingService.updateById(AppId).subscribe((data)=>{
         // this.router.navigate(['/jobdetail']); 
    })
   }

}
