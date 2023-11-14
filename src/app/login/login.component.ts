import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from './user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {


  email: string = '';
  password: string = '';
  loginResult?: boolean;
  loggedIn = false;

  constructor(private userService:UserService) { 
    this.init();
  }

  async init(){
    this.loggedIn = await this.userService.isAuthenticated();
  }

  async login() {
    // Implement your login logic here, e.g., sending a request to a server
    if(this.email && this.password){
      let result = await this.userService.login(this.email, this.password);
      if(result){
        window.open('about-me', '_self');
      }
      else{
        this.loginResult = false;
      }
    }
    this.email = '';
    this.password = '';
    return false;
    // You can add your authentication logic here and navigate to another page if login is successful.
  }

  async logout(){
    this.userService.logout();
    this.loggedIn = false;
  }

  ngOnInit(){
  }

  createUser(){
    let user = new User('maniarruchi@gmail.com');
    let password = 'artboss1998';
    let result = this.userService.createUser(user, password);
  }
}
