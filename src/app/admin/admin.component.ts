import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobPostingModel } from '../home/jobposting.model';
import { JobpostingService } from '../jobposting.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  postajob : JobPostingModel [] |any;
  constructor(public jobpostingService: JobpostingService, public router:Router) { }

  ngOnInit(): void {   
  }
}
