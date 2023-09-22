import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { GalleryService } from '../gallery/gallery.service';
import { UserService } from '../shared/services/user.service';



@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  toolbarTabs = {
    'about-me':['about-me'],
    'portfolio':['gallery', ]
  }
  private activeTabSubject = new BehaviorSubject<string>(''); // Initialize with an empty string or a default tab value
  activeTab$: Observable<string> = this.activeTabSubject.asObservable();

  private activeSubTabSubject = new BehaviorSubject<string>(''); // Initialize with an empty string or a default tab value
  activeSubTab$: Observable<string> = this.activeSubTabSubject.asObservable();
  

  portfolioCategories = [];

  constructor(private route:ActivatedRoute, private router:Router, private galleryService:GalleryService) { 
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        // You can parse the URL and determine the active tab based on it.
        const url = event.url;
        const currTab = this.determineActiveTab(url);
        const currSubTab = await this.determineActiveSubTab(url);

        this.activeTabSubject.next(currTab);
        this.activeSubTabSubject.next(currSubTab);
      }
    });
  }


  private determineActiveTab(url: string): string {
    // Implement your logic to determine the active tab based on the URL.
    // You can use regular expressions, string matching, or any other criteria.
    // For example, you can use the URL segments to make a decision.
    const segments = url.split('/');
    if (segments.includes('about-me')) {
      return 'about-me';
    } else if (segments.includes('gallery')) {
      return 'gallery';
    } 
    else if (segments.includes('contact')) {
      return 'contact';
    } else {
      return 'home'; // Set a default tab if no match is found.
    }
  }

  private async determineActiveSubTab(url: string): Promise<string> {
    // Implement your logic to determine the active tab based on the URL.
    // You can use regular expressions, string matching, or any other criteria.
    // For example, you can use the URL segments to make a decision.
    const decodedString = decodeURIComponent(url);
    const segments = decodedString.split('/');
    this.portfolioCategories = await this.getPortfolioCategories();
    if (segments.includes('gallery')) {
      let foundCategory:any = this.portfolioCategories.find((category:any)=>{
        if(segments.includes(category.name)){
          return true;
        };
        return false;
      });
      if(foundCategory)
      { 
        return foundCategory.displayName;
      }
    }
    return '';
  }


  async getPortfolioCategories(){
    let categories =  await this.galleryService.getCategories();
    return categories.map((item:String)=>{
      return {
        displayName:item.replace('-', ' '),
        name:item
      };
    })
  }

  getActiveTab(){
    return this.activeTab$;
  }
  getActiveSubTab(){
    return this.activeSubTab$;
  }

}
