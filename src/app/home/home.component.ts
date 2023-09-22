import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  mainImageUrl = '/assets/img/Pinocchio.jpg';

  @ViewChild('mainImage') mainImage!: ElementRef;
  constructor(private renderer:Renderer2){

  }
  fadeImg(image: any) {
    this.renderer.setStyle(image, 'transition', 'opacity 3s');
    this.renderer.setStyle(image, 'opacity', '1');
  }

  // ngAfterViewInit(): void {
  //     this.mainImage.nativeElement.addEventListener("load", () => this.fadeImg(this.mainImage.nativeElement));
  //     this.renderer.setStyle(this.mainImage.nativeElement, 'opacity', '0');
  // }

  openLink(link:string){
    window.open(link, '_self');
  }
}
