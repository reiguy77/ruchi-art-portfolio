import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'side-editor',
  templateUrl: './side-editor.component.html',
  styleUrls: ['./side-editor.component.less']
})
export class SideEditorComponent {
  @Input() show = false;
  @Input() imageValues:any = {};
  @Output() imageValuesChange:EventEmitter<any> = new EventEmitter();
  @Output() onImageValuesChanged:EventEmitter<any> = new EventEmitter();
  @Output() onCloseClicked:EventEmitter<any> = new EventEmitter();

  
  close(){
    // this.show = false;
    console.log(this.imageValues);
    this.onCloseClicked.emit(false);
  }

  updateValues(){
    console.log(this.imageValues);
    this.onImageValuesChanged.emit(this.imageValues);
  }

  updateBackground($event:any){
    console.log(this.imageValues.background);
  }


}
