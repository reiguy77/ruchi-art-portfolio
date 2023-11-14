import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading:boolean = false;
  message:string = "Loading...";
  constructor() { 
  }

  startLoading(message?:string){
    message ? this.message = message : '';
    this.isLoading = true;
  }
  reset(){
    this.message = "Loading...";
    this.isLoading = false;
  }
}
