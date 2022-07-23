import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AlumniComponent } from './alumni/alumni.component';
import { ApplynowComponent } from './applynow/applynow.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { FacultyComponent } from './faculty/faculty.component';
import { HomeComponent } from './home/home.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { JobpostingComponent } from './jobposting/jobposting.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TestimonialComponent } from './testimonial/testimonial.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'testimonial',component:TestimonialComponent},
  
  {path:'postajob',  canActivate: [AuthGuard], component:JobpostingComponent},
  {path:'jobdetail', component:JobdetailComponent,
children:[{path:'applynow',  canActivate: [AuthGuard], component:ApplynowComponent}]},
  {path:'joblisting', component:JoblistingComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'alumni',  canActivate: [AuthGuard], component:AlumniComponent},
  {path:'faculty',  canActivate: [AuthGuard], component:FacultyComponent},
  {path:'faculty',  canActivate: [AuthGuard], component:FacultyComponent},
  {path:'applynow',  canActivate: [AuthGuard], component:ApplynowComponent},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
