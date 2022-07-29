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
  requiredFileType!: string;

  fileName = '';
  uploadProgress!: number;
  uploadSub: Subscription = new Subscription;
  file!: File;
  constructor(private http: HttpClient,public jobpostingService: JobpostingService, public router:Router) {}
  ngOnInit(): void {
  }
  onFileSelected(event:any) {
  this.file     = event.target.files[0];
  }
      
upload(){
  if (this.file) {
    this.fileName = this.file.name; 
    this.uploadSub = this.jobpostingService.upload(this.file).subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        console.log(event);
       // this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      }
    })
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
