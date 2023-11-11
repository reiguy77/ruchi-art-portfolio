import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.less']
})
export class ConfirmationModalComponent {
  @Input() title:string = '';
  @Input() action:string = '';
  @Input() undoable = false;
  constructor(private modalService:NgbActiveModal){
  }


  close() {
    this.modalService?.close();
  }

  confirm() {
    this.modalService?.close('Confirmed');
  }

}
