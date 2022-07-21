import { Component, OnInit } from '@angular/core';
import { JobPostingModel } from './jobposting.model';
import { JobpostingService } from '../jobposting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postajob : JobPostingModel [] |any;

  constructor(public jobpostingService: JobpostingService) { }

  ngOnInit(): void {
    this.jobpostingService.getJobs().subscribe((data)=>{
      this.postajob=JSON.parse(JSON.stringify(data))
    })
  }

}
