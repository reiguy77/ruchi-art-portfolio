import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { PageService } from '../shared/services/page/page.service';
import { transition, trigger, style, animate } from '@angular/animations';
import { Image } from '../shared/interfaces/image.interface';
import { ImageService } from '../shared/services/image/image.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.less'],
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
export class AboutMeComponent {
  pageJson:any = {
    title: 'Ruchi Maniar, Visual Artist',
    bodyText: `Hello, I'm Ruchi Maniar, an artist whose passion lies in the vibrant world of visual arts. I specialize in acrylic and oil painting, using these versatile mediums to express my creativity and imagination on canvas. 
    \nArt has always been an integral part of my life, allowing me to explore the depths of my emotions and experiences through color, texture, and form. My paintings often reflect a deep connection with nature, as well as the interplay of light and shadow in the world around us.
    \nRecently, I have embarked on an exciting journey of exploration into other artistic mediums, including pottery. This new venture has broadened my horizons and enriched my creative process. Pottery, with its tactile and sculptural qualities, has added another dimension to my artistic expression.
    \nArt, for me, is a continuous journey of self-discovery and growth. I find inspiration in the everyday beauty that surrounds us, from the intricate details of a flower petal to the vastness of a starry night sky. Through my work, I hope to evoke emotions, spark conversations, and share the wonder I find in the world.
    \nThank you for joining me on this artistic adventure. I look forward to sharing my creations and connecting with fellow art enthusiasts.`,
    mainImageId: ''
  };
  isLoggedIn:boolean = false;
  images:Image[] = [];
  mainImageUrl = '';
  environment = environment;
  
  constructor(protected userService:UserService, private pageService:PageService, 
    private imageService:ImageService){
    this.checkIsLoggedIn();
    this.getPageJson().then(()=>{
      this.getPageImages();
    })
  }

  updatePageJson(){
    this.pageService.updatePage('about-me', this.pageJson);
  }

  async checkIsLoggedIn(){
    this.isLoggedIn = await this.userService.isAuthenticated();
  }

  async getPageJson(){
    let savedPageJson = await this.pageService.getPage('about-me');
    if(Object.keys(savedPageJson).length > 0){
      this.pageJson = savedPageJson;
    }
  }
  async getPageImages(){
    let resp = await this.imageService.getImagesByIds([this.pageJson.mainImageId]);
    if(resp.data?.length > 0)
    {
      this.mainImageUrl = resp.data[0].url;
    }
  }

  async updateMainImage(newImage:File){
    let result = await this.imageService.addImages('*page*-about-me', [newImage]);
    if(result.savedImages?.length > 0){
      this.pageJson.mainImageId = result.savedImages[0]._id;
      this.updatePageJson();
    }
    this.getPageImages();
    // this.pageJson.mainImageId = result;
  }
  
}
