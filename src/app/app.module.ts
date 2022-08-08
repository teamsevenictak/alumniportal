import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { JobpostingComponent } from './jobposting/jobposting.component';
import { JobpostingService } from './jobposting.service';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FacultyComponent } from './faculty/faculty.component';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { LoggedheaderComponent } from './loggedheader/loggedheader.component';
import { SubmissionComponent } from './submission/submission.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplynowComponent } from './applynow/applynow.component';
import { AdminComponent } from './admin/admin.component';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    TestimonialComponent,
    JobpostingComponent,
    JobdetailComponent,
    JoblistingComponent,
    SignupComponent,
    LoginComponent,
    FacultyComponent,
    LoggedheaderComponent,
    SubmissionComponent,
    ApplynowComponent,
    AdminComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CKEditorModule 

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [JobpostingService,AuthService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
