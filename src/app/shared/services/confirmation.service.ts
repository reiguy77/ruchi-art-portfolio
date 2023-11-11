import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private modalService:NgbModal) { }

  openConfirmModal(title:string, action:string, callback:()=>void) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { centered: true });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.action = action;
    modalRef.result.then(
      (result) => {
        if (result === 'Confirmed') {
          console.log('yes')
          callback();
        }
      },
      (reason) => {
        console.log('nope');
      }
    );
  }
}
