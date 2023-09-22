import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, ViewChild, Output, EventEmitter, HostBinding, OnChanges, Renderer2, ElementRef } from '@angular/core';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lightGallery from 'lightgallery';
import { LightGallery } from 'lightgallery/lightgallery';
import { LightGallerySettings } from 'lightgallery/lg-settings';
// Look into using lightgallery
import * as uuid from 'uuid';
import { RoleAuthorizationService } from '../shared/services/role-authorization.service';
import { Role } from '../shared/Role';

@Component({
  selector: 'photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGalleryComponent implements OnChanges {


  private readonly editors: Role[] = [new Role('Agent'), new Role('Administrator')];
  canEdit:Boolean = false;

  // public get canEdit(): boolean { return this.auth.isAuthorized(this.editors); }

  @Input () items : {id: String, size: String, src: String, 
    thumb:String,  subHtml:String, description:String, spanCol?:number, spanRow?:number, background?:string}[] = [];
  @Input() hoverOptions : {numColumns: string, showZoom:Boolean, showOverlay:Boolean, overlayColor:string} = {numColumns: '4', showZoom: true, showOverlay: true, overlayColor: 'rgba(0, 0, 0, 0.158)'};
  @Input() type? : string = "";
  @Input() hoverColor :string = '';
  @Input() adminMode: boolean = false;
  @Output() imageClicked: EventEmitter<any> = new EventEmitter();
  @Output() updateImageProperties: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.--num-columns')
      num_columns = this.hoverOptions.numColumns;
    
  @HostBinding('style.--hover-zoom')
      hover_zoom = '1';

  @HostBinding('style.--hover-opacity')
    hover_opacity = '0';

  @HostBinding('style.--hover-color')
    hover_color = this.hoverOptions.overlayColor;
  


  galleryId = uuid.v4();
  sideEditorOpen = false;
  editingId = -1;


  showInformation : Boolean = false;
  imageObjects: {'url':String, 'description': String, 'tags': [], 'showInformation': Boolean, 
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
    thumbnail: true,

    galleryId: "image-gallery_"+this.galleryId,
    captions: true,
    lastRow: "hide",
    margins: 5
  };


  
  gallery:any;

  constructor (private renderer: Renderer2, private el: ElementRef, private auth:RoleAuthorizationService){
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
  }

  closeEditor(){
    this.sideEditorOpen = false;
    let img_wrapper = document.getElementById('image-wrapper_'+this.editingId);
    img_wrapper?.classList.add('img-wrapper-hover');
  }

  updateImageValues($event:any){
    this.items[this.editingId] = $event;
    this.updateImageProperties.emit({
      id: this.editingId, 
      newValues: $event});
  }



  ngOnInit() {
    this.setCSSProperties();
    
  }





  setCSSProperties() {
    let zoomRatio = '1.1';
    let opacity = '1';
    this.num_columns = this.hoverOptions.numColumns;
    this.hover_color = this.hoverOptions.overlayColor;
    if(this.hoverOptions.showZoom){
      this.hover_zoom = zoomRatio;
    }
    if(this.hoverOptions.showOverlay){
      this.hover_opacity = opacity
    }
  }

  ngAfterViewInit() {
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
      }
    });

    const fadeImages = document.querySelectorAll('.fade-in-image');

    fadeImages.forEach(image => {
      image.addEventListener('load', () => {
        image.classList.add('loaded');
      });
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
    console.log('Change:',changes);
      if (changes['hoverOptions'] && changes['hoverOptions'].currentValue) {
        console.log(changes['hoverOptions'].currentValue);
      }
    this.setCSSProperties();
  }


  // What I want is an image gallery that has select photos that should stand out
  // The others will fit in around these
}