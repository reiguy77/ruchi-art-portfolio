import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import {style, state, animate, transition, trigger} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { GalleryService } from './gallery.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(200, style({opacity:0})) 
      ])
    ])
  ]
})
export class GalleryComponent {
  allImages:any;
  categoryKeys?:string[];
  loadedImages: boolean[] = [];
  selectedCategory?:string = '';
  categories?:string[];
  admin = {
    adminMode: false,
    loggedIn: false
  }
  hoverOptions = {
    showZoom : true,
    showOverlay : true,
    overlayColor : '#fc853aaa',
    numColumns : '3',
  }

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute, private userService:UserService,
    private galleryService:GalleryService) {
    this.init();

  }

  async init(){
    this.admin.loggedIn = await this.userService.isAuthenticated();
    this.admin.adminMode = this.admin.loggedIn;
  }

  ngOnInit() {
    this.loadImages().then(()=>{

      this.processImages();
    });

    this.selectedCategory = this.route.snapshot.paramMap.get('category')?.toUpperCase();
    
  }
  processImages(){
    this.categoryKeys = Object.keys(this.allImages);
    this.categoryKeys.forEach((key, index, array)=>{
      let newKey = key.toUpperCase();
      array[index] = newKey;
      delete Object.assign(this.allImages, {[newKey]: this.allImages[key] })[key];
    })
    
    this.categoryKeys.forEach((key)=>{
      this.allImages[key] = this.allImages[key].map((image:any, index:number)=>{
        let spanRow = '';
        let spanCol = '';
        let url = '';
        let background = '#ffffff';
        if(typeof(image) == 'object'){
            url = image.url;
            spanRow = 'span '+image.spanRow;
            spanCol = 'span ' + image.spanCol;
            background = image.background;
        }
        else{
          url = image;
        }
        if(url.toLowerCase().includes('dance')){
          console.log('hello!')
          spanRow = 'span 2';
        }
        if(url.includes('B2F38FE6-96E5-4D39-8511-805B11B246DE')){
          spanCol = 'span 2';
        }
        return {
          id: index, size: '140', src: url, 
          thumb:url.replace('Records/', 'Records/compressed_'),  subHtml:'<h1></h1>', description:'Temp', spanCol, spanRow, background
        }
      })
    })
  }
  async loadImages() {
    this.categoryKeys  = await this.galleryService.getCategories();
    let resp = await fetch('assets/json/current-paintings.json');
    this.allImages = await resp.json();
    // Initialize the loadedImages array with all false values (LQIPs are shown initially)
    this.loadedImages = new Array(this.allImages.length).fill(false);
  }

  saveNewImageProperties(event:any){
    console.log(event);
  }

  onImageLoaded(index: number) {
    this.loadedImages[index] = true;
  }

  onNewImagesLoaded(files:File[]){
    console.log(files);
  }

}
