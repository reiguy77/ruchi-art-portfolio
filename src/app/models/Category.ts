import { GalleryCategoryProperties } from "../shared/interfaces/galleryCategoryProperties.interface";

export class Category{

    _id?:string;
    name: string;
    displayName?:string;
    properties?: GalleryCategoryProperties;
    
    constructor(
        name: string,
        _id?: string,
        properties?: GalleryCategoryProperties
    ) { 
      this._id = _id;
      this.name = name;
      this.displayName = name.replace('-', ' ');
      this.properties = properties;
    }
}