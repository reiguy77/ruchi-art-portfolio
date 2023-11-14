import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, ViewChild, Output, EventEmitter, HostBinding, OnChanges, Renderer2, ElementRef, HostListener } from '@angular/core';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';
import { LightGallerySettings } from 'lightgallery/lg-settings';
import * as uuid from 'uuid';
import { RoleAuthorizationService } from '../shared/services/role-authorization.service';
import { Role } from '../shared/Role';
import lightGallery from 'lightgallery';
import { ImageProperties } from '../shared/interfaces/image.interface';
import { GalleryCategoryProperties } from '../shared/interfaces/galleryCategoryProperties.interface';
import { GridItem } from '../shared/components/drag-and-drop/drag-and-drop.component';
import { ImageService } from '../shared/services/image/image.service';


@Component({
  selector: 'photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGalleryComponent implements OnChanges {


  private readonly editors: Role[] = [new Role('Agent'), new Role('Administrator')];
  canEdit:Boolean = false;

  @Input () items : PhotoGalleryItem[] = [];
  @Output() itemsChange:EventEmitter<any> = new EventEmitter();
  @Input() galleryCategoryProperties : GalleryCategoryProperties = {
    numColumns: '4', 
    showOverlay: true, 
    overlayColor: 'rgba(0, 0, 0, 0.158)', 
    descriptionColor:'#000000',
    rowGap: 20,
    colGap: 20};
  @Input() editMode: boolean = false;
  @Output() imageClicked: EventEmitter<any> = new EventEmitter();
  @Input() dragAndDropViewOpen:boolean = false;

  gridItems:GridItem[] = [];

  @HostBinding('style.--num-columns')
      num_columns = this.galleryCategoryProperties.numColumns;
    
  @HostBinding('style.--hover-zoom')
      hover_zoom = '1';

  @HostBinding('style.--hover-opacity')
    hover_opacity = '0';

  @HostBinding('style.--hover-color')
    hover_color = this.galleryCategoryProperties.overlayColor;
  


  galleryId = uuid.v4();
  sideEditorOpen = false;
  editingId = -1;


  showInformation : Boolean = false;
  imageObjects: {'url':string, 'description': string, 'tags': [], 'showInformation': Boolean, 
  spanCol?:string, spanRow?:string}[] = [];

  private lightGallery!: LightGallery;
  private needRefresh = false;
  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }
  title = 'angular-demo';
  settings = {
    counter: false,
    plugins: [],
    thumbnail: false,
    galleryId: "image-gallery_"+this.galleryId,
    captions: true,
    lastRow: "hide",
    margins: 5,
    download: false,
    mobileSettings: {
      controls: false,
      showCloseIcon: false,
      download: false,
      rotate: false,
    }
  };

  constructor (private renderer: Renderer2, private el: ElementRef, private auth:RoleAuthorizationService,
    private ref: ChangeDetectorRef, private imageService:ImageService){
  }

  onInit = (detail:any): void => {
    this.lightGallery = detail.instance; 
  };

  openEditor($event:Event, index:number){
    $event.stopPropagation();
    this.editingId = index;
    this.sideEditorOpen = true;
    let img_wrapper = document.getElementById('image-wrapper_'+index);
    img_wrapper?.classList.remove('img-wrapper-hover');
    let img = document.getElementById('grid-image-container_'+index);
    img?.classList.add('no-pointer-events');
  }

  closeEditor(){
    this.sideEditorOpen = false;
    let img_wrapper = document.getElementById('image-wrapper_'+this.editingId);
    img_wrapper?.classList.add('img-wrapper-hover');
    let img = document.getElementById('grid-image-container_'+this.editingId);
    img?.classList.remove('no-pointer-events');
  }

  ngOnInit() {
    // this.setCSSProperties();
    this.addEventListeners();
    this.mapItemsToGridItems();
    this.sortItems();
  }

  mapItemsToGridItems(){
    this.gridItems = this.items.map((item)=>{
      if(item.properties.spanCol > parseInt(this.galleryCategoryProperties.numColumns))
      {
        return  {
          cols: 1,
          rows: 1,
          x: 1,
          y: 1
        } as GridItem
      }
      else{
        return {
          cols: item.properties.spanCol && item.properties.spanCol > 0 ? item.properties.spanCol : 1,
          rows: item.properties.spanRow  && item.properties.spanRow > 0 ? item.properties.spanRow : 1,
          x: item.properties.x ?? 0,
          y: item.properties.y ?? 0,
          imageUrl: item.src,
          _id:item.imageId
        } as GridItem;
      }
    });
  }


  addEventListeners(){
    const lightGallery = document.getElementById('lightgallery');
    const galleryItems = lightGallery?.querySelectorAll('div');

    galleryItems?.forEach(item => {
      item.addEventListener('click', (event) => {
        if (this.sideEditorOpen) {
          // Prevent LightGallery from opening
          event.preventDefault();
        }
      });
    });
  }
  setCSSProperties() {
    let zoomRatio = '1.1';
    let opacity = '1';
    this.num_columns = this.galleryCategoryProperties.numColumns;
    this.hover_color = this.galleryCategoryProperties.overlayColor;
    this.hover_zoom = zoomRatio;
    
    if(this.galleryCategoryProperties.showOverlay){
      this.hover_opacity = opacity
    }
    
  }

  ngAfterViewInit() {
    this.setLightGallery();
  }


  setLightGallery(){
    const lgSettings: LightGallerySettings = {
      ...{ 
        onBeforeSlide: this.onBeforeSlide,
        onInit: this.onInit,
     }, 
     ...this.settings,
     subHtmlSelectorRelative: true,
    };
    setTimeout(() => {

    const masonry = document.getElementById('image-gallery_'+this.galleryId)
      if(masonry){
        this.lightGallery = lightGallery(masonry, lgSettings);
        this.lightGallery.refresh();
      }
    });  

  }
  addImage = () => {
    this.items = [
      ...this.items,
      this.items[this.items.length-2]
    ];
    this.needRefresh = true;
  };


  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
  };

  ngOnChanges(changes: SimpleChanges) {
    this.setCSSProperties();
    this.setLightGallery();
    if(changes['items']){
      this.mapItemsToGridItems();
      this.sortItems();
    }
  }

  removeImage(editingId:number){
    this.sideEditorOpen = false;
    // this.ref.detectChanges();
    this.items.splice(editingId, 1);
    this.itemsChange.emit(this.items);
  }

  updateItems(newItems:GridItem[]){
    let updatedOrderItems: PhotoGalleryItem[] = [];
    newItems.forEach((item, index)=>{
      let foundIndex;
      let currItem = this.items.find((originalItem, currItemIndex)=>{
        if(originalItem.imageId == item._id){
          foundIndex = currItemIndex;
          return true;
        }
        return false;
      })
      if(currItem){
        let change = false;
        if(item.cols != currItem.properties.spanCol){
          currItem.properties.spanCol = item.cols;
          change = true;
        }
        if(item.rows != currItem.properties.spanRow){
          currItem.properties.spanRow = item.rows;
          change = true;
        }
        if(item.x != currItem.properties.x){
          currItem.properties.x = item.x;
          change = true;
        }
        if(item.y != currItem.properties.y){
          currItem.properties.y = item.y;
          change = true;
        }
        if(change){
          this.imageService.updateImageProperties(currItem.properties, currItem.imageId);
        }
        updatedOrderItems.push(currItem);
      }
    })
    this.items = updatedOrderItems;
  }

  sortItems(){
    this.items.sort(this.comparePositions)
  }
  comparePositions(a:PhotoGalleryItem, b:PhotoGalleryItem) {
    if(a.properties.y != null && b.properties.y != null && a.properties.x != null && b.properties.x != null){
      if(a.properties.y == b.properties.y){
        return a.properties.x - b.properties.x
      }
      else{
        return a.properties.y - b.properties.y;
      }
    }
    return 1; 
  }
}


interface PhotoGalleryItem {
    id: string, 
    imageId:string,
    size: string, 
    src: string, 
    thumb:string,  
    subHtml:string,
    properties: ImageProperties
  }
