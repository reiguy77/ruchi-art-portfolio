import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/services/user.service';
import { GalleryService } from '../gallery.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.less']
})
export class AddCategoryModalComponent {
  
  categoryName = '';
  categoryImages:File[] = [];

  myForm: FormGroup;


  constructor(private modalService:NgbActiveModal, private galleryService:GalleryService,
    private fb:FormBuilder){
    this.myForm = this.fb.group({
      categoryNameInput: ['', [Validators.required]],
    });
  }

  addImages(files:any){
    this.categoryImages = files;
  }

  close() {
    this.modalService?.close();
  }

  confirm() {
    console.log(this.myForm);
    this.modalService?.close({categoryName: this.categoryName, categoryImages: this.categoryImages});
  }

}
