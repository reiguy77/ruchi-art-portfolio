import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../../login/user';
import { Buffer} from 'buffer';

@Injectable({
  providedIn: 'root'
})


export class SectionService {
    sectionBaseUrl =  `${environment.server.protocol}://${environment.server.host}/api/section`;
    
    async getSectionJson(sectionName:string){
    const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appId: environment.appId,
          sectionName
        })
      }
      let resp = await fetch(`${this.sectionBaseUrl}/getSection`, options);
      let data = await resp.json();
      console.log('GET PAGR REUSLT: ', data);
      return data;
    }

    async updateSectionJson(sectionName:string, updatedJson:any){
        const options = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              appId: environment.appId,
              sectionName,
              json:updatedJson
            })
          }
          let resp = await fetch(`${this.sectionBaseUrl}/updateSection`, options);
          let data = await resp.json();

      console.log('UPDATE PAGR REUSLT: ', data);
          return data;
    }
  
  }