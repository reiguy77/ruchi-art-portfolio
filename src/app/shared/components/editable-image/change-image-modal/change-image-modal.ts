import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'change-image-modal',
  templateUrl: './change-image-modal.component.html',
  styleUrls: ['./change-image-modal.component.less']
})
export class ChangeImageModalComponent {
  
  newImage?:File;


  constructor(private modalService:NgbActiveModal){
  }

  addImage(file:File[]){
    if(file.length > 0){
      this.newImage = file[0];
    }
  }
  close() {
    this.modalService?.close();
  }

  confirm() {
    this.modalService?.close(this.newImage);
  }

}
