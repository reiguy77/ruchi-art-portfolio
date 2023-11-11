export interface ImageProperties {
    description: string, 
    descriptionColor:string,
    spanCol: number,
    spanRow: number,
    backgroundColor: string,
  
  }
  
export interface Image{
    imageId:string, 
    properties: ImageProperties,
    url: string
  }
  