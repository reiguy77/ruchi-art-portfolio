export interface ImageProperties {
    description: string, 
    spanCol: number,
    spanRow: number,
    backgroundColor: string,
    imageDisplay: ImageDisplayType
    x?:number,
    y?:number
  }

  export enum ImageDisplayType {
    Contain = "contain",
    Fill = "fill",
    Cover = "cover"
  }
  
export interface Image{
    imageId:string, 
    properties: ImageProperties,
    url: string
  }
  