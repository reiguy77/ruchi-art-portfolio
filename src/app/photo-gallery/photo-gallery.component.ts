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


@Component({
  selector: 'photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGalleryComponent implements OnChanges {


  private readonly editors: Role[] = [new Role('Agent'), new Role('Administrator')];
  canEdit:Boolean = false;

  @Input () items : {
    id: string, 
    imageId:string,
    size: string, 
    src: string, 
    thumb:string,  
    subHtml:string,
    properties: ImageProperties}[] = [];
  @Output() itemsChange:EventEmitter<any> = new EventEmitter();
  @Input() galleryCategoryProperties : GalleryCategoryProperties = {numColumnsLarge: '4', showOverlay: true, overlayColor: 'rgba(0, 0, 0, 0.158)', numColumnsSmall: '1', descriptionColor:'#000000'};
  @Input() editMode: boolean = false;
  @Output() imageClicked: EventEmitter<any> = new EventEmitter();
  @Output() updateImageProperties: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.--num-columns')
      num_columns = this.galleryCategoryProperties.numColumnsLarge;
    
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
    private ref: ChangeDetectorRef){

    this.setCSSProperties();   
    console.log(this.galleryCategoryProperties.overlayColor);
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

  updateImageValues($event:any){
    this.items[this.editingId] = $event;
    this.updateImageProperties.emit({
      id: this.editingId, 
      newValues: $event});
  }

  ngOnInit() {
    // this.setCSSProperties();
    this.addEventListeners();
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
    this.num_columns = this.galleryCategoryProperties.numColumnsLarge;
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
  }

  removeImage(editingId:number){
    this.sideEditorOpen = false;
    // this.ref.detectChanges();
    this.items.splice(editingId, 1);
    this.itemsChange.emit(this.items);
  }

}