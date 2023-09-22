import { Component } from '@angular/core';
import { ContactService } from './contact.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(200, style({opacity:0})) 
      ])
    ])
  ]
})
export class ContactComponent {
  name?:string;
  email?:string;
  message?:string;


  constructor(private contactService:ContactService){

  }
  sendEmail(){
    if(this.message && this.email && this.name){
      this.contactService.sendContactForm(this.message, this.email, this.name);
    }
    this.name = '';
    this.email = '';
    this.message = '';
  }


}
