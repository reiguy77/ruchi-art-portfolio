import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  pageBaseUrl = `${environment.server.protocol}://${environment.server.host}/api/page`;
  appId = environment.appId;
  async updatePage(pageName:string, pageJson:any){
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageName,
        pageJson,
        appId: this.appId
      })
    }
    let resp = await fetch(`${this.pageBaseUrl}/`, options);
    let data = await resp.json();
    console.log('response:',data)
    return data;
  }
  
  async getPage(pageName:string){

    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }

    let resp = await fetch(`${this.pageBaseUrl}/${this.appId}/${pageName}`, options);
    let data = await resp.json();
    if(!data.error){
      return data.page.pageJson;
    }
    return {};
  }
}
