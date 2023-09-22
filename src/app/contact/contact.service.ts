
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
  })
  export class ContactService {

    async sendContactForm(text:string, email:string, name:string){
        let baseUrl = `${environment.server.protocol}://${environment.server.host}/api/email`
        let subject = 'Website Contact!';
        let to = environment.adminEmail;
        let from = 'contact@reillymclaren.com';
        text += '\n\nFrom: ' + name + '\n\nTheir email is: '+email;

        try{
         const resp = await fetch(baseUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
                body: JSON.stringify({
                    text,
                    to,
                    from,
                    subject
                }),
            });
        const data = await resp.json();
        return data;
        }
    catch(e){
        console.log(e);
        return {};
    }

    }

  }