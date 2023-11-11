import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/services/user.service';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.less']
})
export class AddCategoryModalComponent {
  
  categoryName = '';
  categoryImages:File[] = [];


  constructor(private modalService:NgbActiveModal, private galleryService:GalleryService){
  }

  addImages(files:any){
    this.categoryImages = files;
  }

  close() {
    this.modalService?.close();
  }

  confirm() {
    this.modalService?.close({categoryName: this.categoryName, categoryImages: this.categoryImages});
  }

}
