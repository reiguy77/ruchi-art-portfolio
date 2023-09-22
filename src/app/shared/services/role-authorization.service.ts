import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthorizationService {

  constructor() { }

  isAuthorized(){
    console.log('authorizing...');
  }
}
