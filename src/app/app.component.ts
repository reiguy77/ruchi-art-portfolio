import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingService } from './shared/services/loading/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ruchiArtProject';
  

  constructor(protected userService:UserService, protected loadingService:LoadingService) {
  }

  toggleEditMode(){
    this.userService.admin.editMode = !this.userService.admin.editMode;
  }
  logout(){
    this.userService.logout();
  }
}
