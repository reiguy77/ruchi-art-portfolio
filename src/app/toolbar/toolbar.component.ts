import { Component, HostListener, Input } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { GalleryService } from '../gallery/gallery.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent {

  @Input() tabs?: string[];

  constructor(private toolbarService:ToolbarService, protected userService:UserService,
    private galleryService:GalleryService){

  }

  activeTab$?:Observable<string>;
  activeSubTab$?:Observable<string>;

  portfolioSubTabs?:{name:string, displayName:string}[];
  pageJson?:any;
  admin = {
    adminMode: false,
    loggedIn: false
  }
  dropdownOpen = false;
  nameInline = true;
  smallScreensize = false;

  async ngOnInit(){
    // this.toolbarService.setCurrentTab();
    this.activeTab$ = this.toolbarService.getActiveTab();
    this.activeSubTab$ = this.toolbarService.getActiveSubTab();
    this.portfolioSubTabs = await this.toolbarService.getPortfolioCategories();
    this.setScreensize(window.innerWidth);
    this.isLoggedIn();
  }

  async isLoggedIn(){
    this.admin.loggedIn = await this.userService.isAuthenticated();
    this.admin.adminMode = this.admin.loggedIn;
  }


  openLink(link:string){
    window.open(link, '_self');
  }

  openOnHover(tab:string){
    console.log(tab);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.setScreensize(event.target.innerWidth);
  }

  setScreensize(width:number){
    if(width>999){
      this.smallScreensize = false;
      this.dropdownOpen = true;
    }
    else{
      this.smallScreensize = true;
      this.dropdownOpen = false;
    }
  }


  async openAddCategory(){
    this.galleryService.addCategory();
  }

  switchName(event:any) {
    this.nameInline = !this.nameInline; 
    event.stopImmediatePropagation()
  }

  

  
}
