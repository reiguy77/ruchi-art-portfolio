import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import {style, state, animate, transition, trigger} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { GalleryService } from './gallery.service';
import { Category } from '../models/Category';
import { ImageDisplayType, ImageProperties } from '../shared/interfaces/image.interface';
import { ImageService } from '../shared/services/image/image.service';
import { PageService } from '../shared/services/page/page.service';
import { PhotoGalleryComponent } from '../photo-gallery/photo-gallery.component';
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
  selectedCategory?:Category = new Category('');
  categories:Category[] = [];
  images: Map<String, {url:string, properties: any, imageId: string}[]> = new Map();
  processedImages: {id: string, size: string, src: string, 
    thumb:string,  
    subHtml:string, 
    imageId:string,
    properties:ImageProperties
  }[] = [];
  newFiles: File[] = [];
  dragAndDropViewOpen = false;

  @ViewChild("photoGallery") photoGallery!: PhotoGalleryComponent;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, 
    private route: ActivatedRoute, protected userService:UserService,
    protected galleryService:GalleryService, private imageService:ImageService) {
  }


  async ngOnInit() {
    let routeCategory = this.route.snapshot.paramMap.get('category') ?? "";
    this.selectedCategory = await this.galleryService.getSelectedCategory(routeCategory);
    this.galleryService.getPageJson();
    this.loadImages().then(()=>{
      this.processImages();
    });
  }


  processImages(){
    let temp;
    if(this.selectedCategory?._id){
      temp = this.images.get(this.selectedCategory._id);
    }
    if(temp){
      this.processedImages = temp.map((image, index)=>{
        
        let imageProperties = image.properties;
        if(!imageProperties){
          imageProperties = {};
        }

        return {
          id: index+'', 
          imageId: image.imageId,
          size: '1400-933', 
          src: image.url, 
          thumb:image.url,  
          subHtml:'<h1></h1>', 
          properties:{
            description: imageProperties.hasOwnProperty('description') ? imageProperties.description : '',
            descriptionColor: imageProperties.hasOwnProperty('descriptionColor') ? imageProperties.descriptionColor : '#000000',
            spanCol: imageProperties.hasOwnProperty('spanCol') ? imageProperties.spanCol : '',
            spanRow: imageProperties.hasOwnProperty('spanRow') ? imageProperties.spanRow : '',
            backgroundColor: imageProperties.hasOwnProperty('backgroundColor') ? imageProperties.backgroundColor :  '#ffffff',
            x: imageProperties.x,
            y: imageProperties.y,
            imageDisplay: imageProperties.hasOwnProperty('imageDisplay') ? imageProperties.imageDisplay : ImageDisplayType.Cover
          }
        }
      });
    }
    
  }
  
  async loadImages() {
     let images =  await this.imageService.getImagesByCategoryId(this.selectedCategory?._id);
     if(this.selectedCategory?._id){
        this.images.set(this.selectedCategory._id, images);
     }
  }

  onImageLoaded(index: number) {
    this.loadedImages[index] = true;
  }

  onNewImagesLoaded(files:File[]){
    this.newFiles = files;
  }

  async openCategoryEditor(){
    if(this.selectedCategory){
      let resp = await this.galleryService.openCategoryEditor(this.selectedCategory);
    }
  }

}
