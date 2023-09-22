import { Component, Input } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent {

  @Input() tabs?: string[];

  constructor(private toolbarService:ToolbarService, private userService:UserService){

  }

  activeTab$?:Observable<string>;
  activeSubTab$?:Observable<string>;

  portfolioSubTabs?:{name:string, displayName:string}[];
  admin = {
    adminMode: false,
    loggedIn: false
  }

  async ngOnInit(){
    // this.toolbarService.setCurrentTab();
    this.activeTab$ = this.toolbarService.getActiveTab();
    this.activeSubTab$ = this.toolbarService.getActiveSubTab();
    this.portfolioSubTabs = await this.toolbarService.getPortfolioCategories();
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


  async openAddCategory(){
    console.log('adding category...');
  }

}
