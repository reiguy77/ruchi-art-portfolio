import { Injectable, SimpleChange } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../../login/user';
import { Buffer} from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userBaseUrl =  `${environment.server.protocol}://${environment.server.host}/api/user`;
  refreshTokenBaseUrl =  `${environment.server.protocol}://${environment.server.host}/api/token`;


  access_token?:string;
  refresh_token?:string;
  expires_at?:string;

  admin = {
    loggedIn: false,
    editMode: false
  }


  async login(email:string, password:string){
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        appId: environment.appId
      })
    }
    let resp = await fetch(`${this.userBaseUrl}/verifyUser`, options);
    let data = await resp.json();
    if(!data.error){
      this.processTokenResponse(data);
      this.updateAdmin(true, true);
      return true;
    }
    return false;
    // return categories;
  }

  async createUser(user:User, password:string){
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:user.email,
        password,
        appId: environment.appId
      })
    }
    let resp = await fetch(`${this.userBaseUrl}/`, options);
    let data = await resp.json();
    return data;
  }

  logout(){
    this.refresh_token = undefined;
    this.access_token = undefined;
    this.expires_at = undefined;
    this.updateAdmin(false, false);
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');
  }

  constructor() { 
    this.init();
  }

  parseJwt (token:string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }
  
  refreshToken(refresh_token:string) {
    fetch(this.refreshTokenBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams({
        refresh_token,
      }),
    })
      .then(async (resp)=>{
        let data = await resp.json();
        console.log(data);
        localStorage.setItem('access_token', data.accessToken);
        this.access_token = data.accessToken;
      })
      .catch(this.handleError);
  }

  processTokenResponse(data:any) {
    if(data.error){
      return
    }
    let access_token = data.accessToken;
    let refresh_token = data.refreshToken;
    let access_token_body = this.parseJwt(access_token);
    let expires_at = access_token_body.exp;
    const t = new Date();
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('expires_at', ''+ expires_at);
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.expires_at = ''+expires_at;
  }

  async checkAccessToken(){
    let resp = await fetch(`${this.refreshTokenBaseUrl}/verifyAccessToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token:this.access_token
      })
    })
    let data = await resp.json();
    return !data.error;
  }

  checkTokenExpiration(){
    const curr_time = new Date();
    if(!this.expires_at && this.refresh_token){
      this.refreshToken(this.refresh_token);
      return;
    }
    const expire_time = new Date(Number(this.expires_at));
    console.log(expire_time);
      if(this.refresh_token && curr_time.getTime() > expire_time.getTime()){
        console.log('refreshing token!');
        this.refreshToken(this.refresh_token);
      }
  }

  async isAuthenticated(){
    if(this.access_token && this.refresh_token){
      let validAccessToken = await this.checkAccessToken();
      if(!validAccessToken){
        this.checkTokenExpiration();
      }
      return true; 
    }
    else{
      return false;
    }
  }

  updateAdmin(loggedIn:boolean, editMode:boolean){
    localStorage.setItem('loggedIn', '' + loggedIn);
    localStorage.setItem('editMode', '' + editMode);
    this.admin.loggedIn = loggedIn;
    this.admin.editMode = editMode;
  }

  async init(){
    this.access_token = localStorage.getItem('access_token') ?? undefined;
    this.refresh_token = localStorage.getItem('refresh_token') ?? undefined;
    this.expires_at = localStorage.getItem('expires_at') ?? undefined;

    this.admin.loggedIn = JSON.parse(localStorage.getItem('loggedIn') ?? '') ?? false;
    this.admin.editMode = JSON.parse(localStorage.getItem('editMode') ?? '') ?? false;
    // this.updateAdmin(this.admin.loggedIn, this.admin.loggedIn);
  }

  ngOnChange(changes:SimpleChange){
    if('admin' in changes){
      console.log(changes);
    }
  }

  handleError(error: Error) {
    console.error(error);
  }

}

