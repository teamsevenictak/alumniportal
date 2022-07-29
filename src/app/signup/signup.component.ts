import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title:String="Sign Up";
  User  = 
  { firstname : '',
    email     : '',
    phoneno   : '',
    password  : '', 
    userrole  : '',   
    terms:0}
    

  constructor(private auth:AuthService,private router:Router) { }

  confirmPassword :String= ''; 
  isSuccessful = false;
  errorMessage = '';
  passwordErr = false;
  isEmailErr= false;
  ngOnInit(): void {
  }
  userSignup() { 
    this.isEmailErr= false;
    this.passwordErr = false;
    if(this.User.password != this.confirmPassword)
    {
      this.passwordErr = true ;
    }
    else{
      this.passwordErr = false ;
      this.auth.register(this.User).subscribe({
         next: (data:any) =>  {          
        var userregister = JSON.parse(JSON.stringify(data));
        console.log(data);
        this.isSuccessful = true;        
        this.router.navigate(['/login']); 
         } ,  
         error: (err) => { 
          if(err.error.message=='Email Already exists in our system'){
          this.isEmailErr = true;
        }  
      }
        
          
      })
    }    
    
   }
}
