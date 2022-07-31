import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginuser = {email:'',  password:'' }
  constructor(public _auth:AuthService,private router:Router) { }
  title:String="Login";
  ngOnInit(): void {
  }
  islogErr = false;
  userVerify() { 
    this._auth.userVerify(this.loginuser)
     .subscribe({
      next: (result:any) =>  {
        if(result.message=='Invalid Login credentials'){
          this.islogErr = true;
        }
        else if(result.message=='Login failed'){
          this.islogErr = true;
        } 
        else {
          var LoggedUser = JSON.parse(JSON.stringify(result));  
          localStorage.setItem('token',LoggedUser.token);
          if(LoggedUser.userrole=='user_faculty'){
            this.router.navigate(['/faculty']);
          }
          else if(LoggedUser.userrole=='user_admin'){
            this.router.navigate(['/admin']);
          }
          else if(LoggedUser.userrole=='user_alumni'){
            this.router.navigate(['/joblisting']);
          }
          else if(LoggedUser.userrole=='user_employer'){
            this.router.navigate(['/faculty']);
          }
        }      
        
      },
      complete: () => {console.log('complete');},
      error: (err) => { 
        if(err.error.msg=='Invalid Login credentials'){
        this.islogErr = true;
      } else if(err.error.msg=='Login failed'){
        this.islogErr = true;
      }   
    }
    });   
     
  }

}
