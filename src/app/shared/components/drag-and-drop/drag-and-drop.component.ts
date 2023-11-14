import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import {
  DisplayGrid,
  Draggable,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType
} from 'angular-gridster2';
// import { MarkdownModule } from 'ngx-markdown';

interface Safe extends GridsterConfig {
  draggable: Draggable;
}

@Component({
  selector: 'drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ["./drag-and-drop.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DragAndDropComponent implements OnInit {
  options!: Safe;
  dashboard!: Array<GridsterItem>;
  @Input() numColumns:string = "10";
  @Input() items:GridItem[] = [];
  @Output() orderOrResizeChange: EventEmitter<GridItem[]> = new EventEmitter<GridItem[]>();

  waitToSendUpdates = true;

  static eventStart(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ): void {
  }

  static eventStop(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ): void {
  }

  static overlapEvent(
    source: GridsterItem,
    target: GridsterItem,
    grid?: GridsterComponent
  ): void {
    console.log('overlap', source, target, grid);
  }

  ngOnInit(): void {
    this.updateOptions();
  }

  updateOptions(){
    this.options = {
      gridType: GridType.ScrollVertical,
      displayGrid: DisplayGrid.Always,
      pushItems: true,
      swap: false,
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        stop: DragAndDropComponent.eventStop,
        start: DragAndDropComponent.eventStart,
        dropOverItems: true,
        dropOverItemsCallback: DragAndDropComponent.overlapEvent
      },
      maxCols: parseInt(this.numColumns),
      minCols: parseInt(this.numColumns),
      resizable: {
        enabled: true
      },
    };
  }
  ngOnChanges(changes:SimpleChanges){
    this.updateOptions();
    // this.sendUpdatedItems();
  }
  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item:any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }
  allowUpdates(){
    setTimeout(()=>{
      this.waitToSendUpdates = false;
    }, 1000)

  }

  sendUpdatedItems(){
    if(!this.waitToSendUpdates){
      this.orderOrResizeChange.emit(this.items.sort(this.comparePositions));
    }
  }
  comparePositions(a:GridItem, b:GridItem) {
    if(a.y == b.y){
      return a.x - b.x
    }
    else{
      return a.y - b.y;
    }
  }
}

export interface GridItem {
  _id: string,
  cols: number,
  rows: number,
  x: number, 
  y: number,
  imageUrl: string
}