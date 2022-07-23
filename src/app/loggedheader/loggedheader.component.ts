import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loggedheader',
  templateUrl: './loggedheader.component.html',
  styleUrls: ['./loggedheader.component.css']
})
export class LoggedheaderComponent implements OnInit {

  constructor(public _auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
