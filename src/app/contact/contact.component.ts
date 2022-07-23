import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  Visitor  = 
  { name      : '',
    subject   : '',
    email     : '',
    message   :''
    }
    success:String='';
    status:Boolean=false;
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
  }
  contact(){
    this.contactService.sendEmail(this.Visitor)
    .subscribe((data)=>{
    var contact = JSON.parse(JSON.stringify(data));
    this.success = contact.message;  
    this.status = true;    
    });
  }

}
