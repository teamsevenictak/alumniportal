import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public _auth:AuthService,private router:Router) { }
  title = 'Alumni Job Prtal';
  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
