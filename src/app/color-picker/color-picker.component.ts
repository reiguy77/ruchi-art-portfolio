import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less']
})
export class ColorPickerComponent {

  @Input() changeFunction:Function = ()=>{};
  @Input() color: string = '#FFFFFF';
  @Input() position: string = 'top-right';
  @Output() colorChange: EventEmitter<any> = new EventEmitter();


  onColorChange() {
    console.log(this.color);
    this.colorChange.emit(this.color);
  }


}
