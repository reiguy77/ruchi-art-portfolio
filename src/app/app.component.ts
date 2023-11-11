import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ruchiArtProject';

  constructor(protected userService:UserService) {
  }

  toggleEditMode(){
    this.userService.admin.editMode = !this.userService.admin.editMode;
  }
  logout(){
    this.userService.logout();
  }
}
