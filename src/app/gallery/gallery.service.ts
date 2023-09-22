import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor() { }
  fileBaseUrl =  `${environment.server.protocol}://${environment.server.host}/api/file`;
  async getCategories(){
    const cachedCategories = localStorage.getItem('portfolioCategories');
    if (cachedCategories) {
        // Use the cached subtabs
        const categories = JSON.parse(cachedCategories);
        return categories; // Render the subtabs on the page
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
      return item.categoryName.toUpperCase();
    })
    localStorage.setItem('portfolioCategories', JSON.stringify(categories));
    return categories;
  }

  updateCategories(){

  }

  addCategory(){

  }

  deleteCategory(){
    
  }

  addPhotos(categoryId:string, files:File[]){

  }

  deletePhoto(fileId:string){

  }

  getPhotos(categoryId:string){

  }

}
