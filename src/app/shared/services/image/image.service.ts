import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ImageProperties, Image } from '../../interfaces/image.interface';
import imageCompression from 'browser-image-compression';
import heic2any from "heic2any";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  fileBaseUrl =  `${environment.server.protocol}://${environment.server.host}/api/file`;
  categories:string[] = [];
  user = environment.user;
  appId = environment.appId;

  compressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  }

  async addImages(categoryName:string, files:File[]){
    let user = environment.user;
    const formData = new FormData();
    formData.append('appId', ''+environment.appId);
    formData.append('user', user);
    formData.append('subfolder', categoryName);
    let compressedImages = await this.compressImages(files);
    for (let i = 0; i < compressedImages.length; i++) {
      formData.append('images', compressedImages[i]);
    }
    const options = {
      method: 'POST',
      body: formData
    };
    let resp = await fetch(`${this.fileBaseUrl}/addImages`, options);
    let data = await resp.json();
    return data;
  }

  async deleteImage(imageId:string){
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        },
      body: JSON.stringify({
        user: environment.user,
        appId: environment.appId,
        imageId
      })
    };
    let resp = await fetch(`${this.fileBaseUrl}/deleteImage`, options);
    return resp;
  }

  async getImagesByCategoryId(categoryId?:string){
    if(!categoryId){
      return [];
    }
    const resp = await fetch(`${this.fileBaseUrl}/getImages`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
          body: JSON.stringify({
              user: environment.user,
              appId: environment.appId,
              categoryId,
          }),
      });
      let data = await resp.json();
      if(!data.error){
        let images:Image[] = [];
        data.data.forEach((image:Image)=>{
          images.push({
            imageId:image.imageId,
            url:`${environment.server.protocol}://${environment.server.host}/${image.url}`,
            properties:image.properties
          });
        })
      console.log(images);
      return images;
      }
      return [];
  }

  async updateImageProperties(imageProperties:ImageProperties, imageId:string){
    const resp = await fetch(`${this.fileBaseUrl}/updateImageProperties`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
          body: JSON.stringify({
              imageId,
              imageProperties,
          }),
      });
      let data = await resp.json();
      console.log(data);
      return data;
  }

  async compressImages(files:File[]) {
      const compressedFiles:Promise<File>[] = [];  
      for(const file of files){
        try{
          let compressedFile;
          if(file.name.toLowerCase().includes('heic')){
            compressedFile = this.compressHEIC(file);
          }
          else{
            compressedFile = imageCompression(file, this.compressionOptions);
          }
          compressedFiles.push(compressedFile);
          console.log(file);
          console.log('originalFile instanceof Blob', file instanceof Blob); // true
          console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
          // console.log(`new size! ${compressedFile.size / 1024 / 1024} MB` );
        }
        catch(e){
          console.log("Failed to compress the file!", file, e);
        }
      }  
      return await Promise.all(compressedFiles);
  }

  async compressHEIC(heicFile:File){
    const fileName = heicFile.name; // File name for the resulting File object
    const fileOptions = { type: 'image/jpeg' }; // Mime type of the file (replace with the appropriate type)
    
    const jpegFile = await heic2any(
      {
      blob:heicFile as Blob,
      toType: "image/jpeg",
			quality: 1,
    });
    try{
      const file = new File([jpegFile as Blob], fileName, fileOptions);

    let compressedFile = await imageCompression(file, this.compressionOptions);
    return compressedFile;
    }
    catch(e){
      console.log('ERROR',e);
      let compressedFile = await imageCompression(jpegFile as File, this.compressionOptions);
      return compressedFile;
    }
  }

  async getImagesByIds(imageIds:string[]){
    const resp = await fetch(`${this.fileBaseUrl}/getImages`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
          body: JSON.stringify({
              imageIds,
              user: this.user,
              appId: this.appId
          }),
      });
      let data = await resp.json();
      return data;
  }

}
