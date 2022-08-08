import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JobPostingModel } from '../home/jobposting.model';
import { JobpostingService } from '../jobposting.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  jobItems = new JobPostingModel("","","","","",0,"","","","","","",1);
  public editorConfig = {
		toolbar: [
			[ 'Styles', 'Format', 'Font', 'FontSize' ],
			[ 'Bold', 'Italic' ],
			[ 'Undo', 'Redo' ],
			[ 'About' ],
		],
    height:100,
    placeholder : 'some value',
    autoParagraph: false,
	}
  title:String="Edit Post";
  successmsg:String = '';
  constructor(public jobpostingService : JobpostingService,private _auth:AuthService, public router:Router) { }

  ngOnInit(): void {
    const  jobsID = localStorage.getItem('jobID');
    this.jobpostingService.getJobById(jobsID).subscribe((data)=>{        
      this.jobItems  = JSON.parse(JSON.stringify(data));     
    });
  }
  updatePost(){
    this.jobpostingService.editPost(this.jobItems);
    this.successmsg = "Post Edited";
    this.router.navigate(['/joblisting']);    
  }
}
