import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
//import { AlumniComponent } from './alumni/alumni.component';
import { ApplynowComponent } from './applynow/applynow.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { FacultyComponent } from './faculty/faculty.component';
import { HomeComponent } from './home/home.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { JobpostingComponent } from './jobposting/jobposting.component';
import { LoginComponent } from './login/login.component';
import { RoleGuard } from './role.guard';
import { SignupComponent } from './signup/signup.component';
import { SubmissionComponent } from './submission/submission.component';
import { TestimonialComponent } from './testimonial/testimonial.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'testimonial',component:TestimonialComponent},  
  {path:'postajob',  canActivate: [RoleGuard], component:JobpostingComponent,data: {   role: 'user_faculty' }},
  {path:'jobdetail', component:JobdetailComponent,
children:[{path:'applynow', canActivate: [RoleGuard], component:ApplynowComponent,data: {   role: 'user_alumni' }}]},
  {path:'myjobs',  canActivate: [RoleGuard],component:JoblistingComponent,data: {   role: 'user_faculty' }},
  {path:'joblisting', component:JoblistingComponent},
  {path: 'joblisting/:id', component: JoblistingComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  //{path:'alumni',  canActivate: [RoleGuard], component:AlumniComponent,data: {   role: 'user_alumni' }},
  {path:'faculty',  canActivate: [RoleGuard], component:FacultyComponent,data: {   role: 'user_faculty' }},
  {path:'employee',  canActivate: [RoleGuard], component:FacultyComponent,data: {   role: 'user_faculty' }},
  {path:'admin',  canActivate: [RoleGuard], component:AdminComponent, data: {   role: 'user_admin' }},
  {path:'applynow',  canActivate: [RoleGuard], component:ApplynowComponent,data: {   role: 'user_alumni' }},
  {path:'submission',  canActivate: [AuthGuard], component:SubmissionComponent}
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
