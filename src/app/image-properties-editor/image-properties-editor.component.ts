import { Component, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';
import { ImageService } from '../shared/services/image/image.service'
import { ConfirmationService } from '../shared/services/confirmation.service';

@Component({
  selector: 'image-properties-editor',
  templateUrl: './image-properties-editor.component.html',
  styleUrls: ['./image-properties-editor.component.less']
})

  
export class ImagePropertiesEditorComponent {
  @Input() show = false;
  @Input() imageProperties:any = {};
  @Input() imageId:string = '';
  @Output() imagePropertiesChange:EventEmitter<any> = new EventEmitter();
  @Output() onImagePropertiesChanged:EventEmitter<any> = new EventEmitter();
  @Output() onImageDeleted:EventEmitter<any> = new EventEmitter();
  @Output() onCloseClicked:EventEmitter<any> = new EventEmitter();

  
  position: Position = 'right';
  widthPercentage:number = 100;
  heightPercentage: number = 100;
  Positions:Position[] = ['right', 'bottom', 'left', 'top'];
  colorPositionMap = {
    "right": 'bottom-left',
    "bottom": 'top-right',
    "left": 'bottom-right',
    "top": "bottom-right"
  }

  PositionMap = {
    "right":0,
    "bottom":1,
    "left":2,
    "top":3
  };

  
  constructor(private imageService:ImageService, private confirmationService:ConfirmationService){

  }

  ngOnInit(){
    let savedPosition = localStorage.getItem('position') as Position;
    this.position = savedPosition ? savedPosition : 'right';
  }

  close(){
    // this.show = false;
    console.log(this.imageProperties);
    this.onCloseClicked.emit(false);
  }

  updateProperties(){
    this.imageService.updateImageProperties(this.imageProperties, this.imageId);
  }


  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if(this.show){
      this.show = false;
      this.close();
      event.stopImmediatePropagation();
    }
  }

  updatePosition(){
    let currPosition = this.PositionMap[this.position];
    currPosition = (currPosition+1) % 4;
    this.position = this.Positions[currPosition];
    localStorage.setItem('position', this.position);
  }

  deleteImage(){
    this.confirmationService.openConfirmModal('Delete Photo', 'Delete this photo', ()=> {
      this.imageService.deleteImage(this.imageId);
      this.onImageDeleted.emit();
    })

  }


}


type Position = "right" | "left" | "top" | "bottom";

