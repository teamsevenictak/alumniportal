import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { JobpostingService } from '../jobposting.service';

@Component({
  selector: 'app-applynow',
  templateUrl: './applynow.component.html',
  styleUrls: ['./applynow.component.css']
})
export class ApplynowComponent implements OnInit {


  @Input()
  Alumni  = 
  { name : '',
  filelink     : '',
  postID   :'',
  AlumnId  :'',
  Dateofsub:''

 }
  fileName = '';
  uploadProgress!: number;
  uploadSub: Subscription = new Subscription;
  file!: File;
  shortLink:string='';
  loading:Boolean=false;
  isUploaderr:Boolean=false;
  isSuccessful:Boolean=false;
  constructor(private http: HttpClient,public jobpostingService: JobpostingService, public router:Router) {}
  ngOnInit(): void {
  }
  onFileSelected(event:any) {
  this.file     = event.target.files[0];
  }
      
upload(){
  if (this.file) {
    this.loading = !this.loading;
    this.fileName = this.file.name; 
    this.Alumni.postID = this.jobpostingService.selectedId;
    this.uploadSub = this.jobpostingService.upload(this.file,this.Alumni).subscribe({
      next: (data:any) =>  {   
        var filelink = JSON.parse(JSON.stringify(data));
        this.shortLink = filelink.message;
        console.log( this.shortLink);
        this.loading = false;
        this.isSuccessful=true;
        this.isUploaderr =false;
      } ,  
      error: (err) => { 
       if(err.error.message!=''){
       this.isUploaderr = true;
     }  
   }
    }

      
    )
}
}
cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}

reset() {
  //this.uploadProgress = null;
  //this.uploadSub = null;
}
}
