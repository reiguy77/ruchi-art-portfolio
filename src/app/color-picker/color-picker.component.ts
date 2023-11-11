import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ColorPickerDirective } from 'ngx-color-picker';
import * as uuid from 'uuid';

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

  @ViewChild('colorPicker', { read: ColorPickerDirective }) colorPicker!: ColorPickerDirective;
  id = uuid.v4();
  changingPosition = false; 

  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  
  onColorChange() {
    this.colorChange.emit(this.color);
  }

  async ngOnChanges(changes:SimpleChanges){
    if('position' in changes){
      if(changes['position'].firstChange){
        return;
      }
      this.changingPosition = true;
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 0); 
      });
      this.changingPosition = false;
      this.changeDetectorRef.detectChanges();
    }
  }


}
