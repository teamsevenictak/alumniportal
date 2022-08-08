import { Component, OnInit } from '@angular/core';
import { JobPostingModel } from '../home/jobposting.model';
import { JobpostingService } from '../jobposting.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css']
})
export class JoblistingComponent implements OnInit {
  postajob : JobPostingModel [] |any;
  verifiedpost:Boolean =false;
  route: any;
  id!: string | null;
  
  constructor(public jobpostingService: JobpostingService, public router:Router,public _auth:AuthService,private _Activatedroute:ActivatedRoute) { }


  ngOnInit(): void {     
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
    });
    if(this.id==null){
      this.jobpostingService.getJobs().subscribe((data)=>{
        this.postajob=JSON.parse(JSON.stringify(data));
      })
    }
    else {
      this.jobpostingService.getJobsByCategory(this.id).subscribe((data)=>{
        this.postajob=JSON.parse(JSON.stringify(data));
      })
    }
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
   deletePost(post:any){
    var cnfrm =confirm('Are you sure you want to delete this post?');
    if(cnfrm){
      this.jobpostingService.deletePost(post._id)
      .subscribe((data)=>{ 
        window.location.reload()
        });
    }      
   }
   editPost(jobposting:any){
    var  jobId = jobposting._id;
    this.jobpostingService.getJobById(jobId).subscribe((data)=>{
      var jobDetail = JSON.parse(JSON.stringify(data));
      this.jobpostingService.jobDetails = jobDetail; 
      this.jobpostingService.selectedId = jobId;
      localStorage.setItem('jobID',jobId);
      this.router.navigate(['/editPost']); 
    })
  }
}
