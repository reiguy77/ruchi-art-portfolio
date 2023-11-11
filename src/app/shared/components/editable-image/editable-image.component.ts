import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryService } from 'src/app/gallery/gallery.service';
import { ChangeImageModalComponent } from './change-image-modal/change-image-modal';
import { Image } from '../../interfaces/image.interface';
@Component({
  selector: 'editable-image',
  templateUrl: './editable-image.component.html',
  styleUrls: ['./editable-image.component.less']
})
export class EditableImageComponent {
  @Input() imageUrl?:string = '';
  @Input() editMode:boolean = false;
  // @Input() 
  @Output() imageChange:EventEmitter<File> = new EventEmitter<File>();


  constructor(private galleryService:GalleryService, private modalService:NgbModal)
  { }

  openNewImageModal(){
    console.log(this.imageUrl);
    const modalRef = this.modalService.open(ChangeImageModalComponent, { centered: true, size: 'lg' });
    modalRef.result.then(
      async (result) => {        
        this.imageChange.emit(result);
      },
      (reason) => {
        console.log('nope');
      });
  }
}
