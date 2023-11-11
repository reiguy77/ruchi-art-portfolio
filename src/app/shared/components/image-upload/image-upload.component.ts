import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.less']
})
export class ImageUploadComponent {

  constructor(private http: HttpClient) { 
    if(this.uploadText != 'Choose Images'){
      this.singularUploadText = this.uploadText;
    }
  }


  @Input() isMultiple = false;
  @Input() uploadText = 'Choose Images';
  @Output() imageUploaded = new EventEmitter<File[]>();
  singularUploadText = 'Choose Image';

  
  
  handleFileInput(event:any) {
    let files : File [];
    event.preventDefault();
    files = event.target.files;
    if(files){
      this.imageUploaded.emit(files);
    }
  }

}