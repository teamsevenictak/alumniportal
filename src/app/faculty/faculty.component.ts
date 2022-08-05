import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobPostingModel } from '../home/jobposting.model';
import { JobpostingService } from '../jobposting.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  User  = 
  { firstname : '',
    email     : '',
    phoneno   : '',
    password  : '', 
    userrole  : '',   
    terms:0}
  constructor(public jobpostingService: JobpostingService, public router:Router) { }

  ngOnInit(): void {
    this.jobpostingService.getUser().subscribe((data)=>{
      this.User=JSON.parse(JSON.stringify(data));
    })
  }

}
