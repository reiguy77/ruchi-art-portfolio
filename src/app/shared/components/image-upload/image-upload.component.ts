import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.less']
})
export class ImageUploadComponent {

  constructor(private http: HttpClient) { }


  @Input() isMultiple = false;
  @Output() imageUploaded = new EventEmitter<File[]>();
  
  handleFileInput(event:any) {
    let files : File [];
    event.preventDefault();
    files = event.target.files;
    if(files){
      this.imageUploaded.emit(files);
    }
  }

}