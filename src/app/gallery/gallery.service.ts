import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryModalComponent } from './add-category-modal/add-category-modal.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';
import { Category } from '../models/Category';
import { ImageService } from '../shared/services/image/image.service';
import { PageService } from '../shared/services/page/page.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private modalService:NgbModal, private imageService:ImageService, 
    private pageService:PageService, private route: ActivatedRoute){ }

  fileBaseUrl =  `${environment.server.protocol}://${environment.server.host}/api/file`;
  categories:string[] = [];
  user = environment.user;
  appId = environment.appId;
  pageJson:any = {
    galleryCategoryProperties: {
      showOverlay : true,
      overlayColor : '#fc853aaa',
      numColumns : '3',
      rowGap:20,
      colGap:20
    },
    order:[]
  };
  pageName = 'gallery';
  selectedCategory?:Category;
  

  async getPageJson(){
    let savedPageJson = await this.pageService.getPage(this.selectedCategory?.name ?? '');
    if(Object.keys(savedPageJson).length > 0){
      this.pageJson = savedPageJson;
    }
  }

  async updatePageJson(){
    this.pageService.updatePage(this.selectedCategory?.name ?? '', this.pageJson);
  }


  async getCategories(){
    const cachedCategories = localStorage.getItem('portfolioCategories');
    if (cachedCategories) {
        const categories = JSON.parse(cachedCategories);
        this.categories = categories;
        return categories; 
    }
    let user = environment.user;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user
      })
    }
    let resp = await fetch(`${this.fileBaseUrl}/retrieveCategoryNames`, options);
    let data = await resp.json();
    let categories = data.map((item:any)=>{
      return new Category(item.categoryName, item._id);
    })
    localStorage.setItem('portfolioCategories', JSON.stringify(categories));
    this.categories = categories;
    return categories;
  }



  updateCategory(){

    
  }

  addCategory(){
    const modalRef = this.modalService.open(AddCategoryModalComponent, { centered: true, size: 'lg' });
    modalRef.result.then(
      async (result) => {
        let data = await this.imageService.addImages(result['categoryName'], result['categoryImages']);
        this.categories = this.categories.concat(result['categoryName'])
        localStorage.removeItem('portfolioCategories');
        window.location.href = '/gallery/'+result['categoryName'];
        return data;
      },
      (reason) => {
        console.log('nope');
      }
    );
  }

  async openCategoryEditor(category:Category){
    const modalRef = this.modalService.open(EditCategoryModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.galleryCategoryProperties = this.pageJson.galleryCategoryProperties;
    modalRef.result.then(
      async (result) => {
        if(result.action ? result.action == 'updateProperties' : false){
          this.pageJson.galleryCategoryProperties = result.galleryCategoryProperties;
          this.updatePageJson();
          location.reload();
        }
      }
    );
  }

  async deleteCategory(category:Category){
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId: category._id,
        appId: this.appId,
        user: this.user
      })
    }
    let result = await fetch(`${this.fileBaseUrl}/deleteImageCategory`, options);
    console.log(result);
    localStorage.removeItem('portfolioCategories');
  }  

  async getSelectedCategory(routeCategory: string){
    let categories = await this.getCategories();
    if(routeCategory){
      this.selectedCategory = categories?.find((category:Category)=>{
        return category.name == routeCategory;
      });
    }
    return this.selectedCategory;
  }
}
