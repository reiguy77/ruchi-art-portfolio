import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.less']
})
export class HeroImageComponent {

  constructor(private http: HttpClient) { }


  @Input() imageUrl = '';
  @Input() tint: 'light' | 'dark' |'none' = 'none';
  @Input() parallax?:boolean = false;
  showTint = false; 

  checkTint(){
    this.showTint = this.tint == 'none' ? false : true;
    if(this.showTint){
        this.setColor();
    }
    
  }
  setColor(){
    const heroImage = document.getElementById('hero-image')
    if(heroImage){
      heroImage.classList.add(this.tint == 'light' ? 'light' : 'dark');
    }
  }

  ngOnInit(){
    this.checkTint();
    if(this.parallax){
      this.addParallax();
    }

  }

  addParallax(){
    window.addEventListener('scroll', function() {
      const scrollOffset = window.scrollY;
      const parallaxBg = document.querySelector('.hero-image-container') as HTMLElement;
      if(parallaxBg){
        parallaxBg.style.transform = `translateY(${scrollOffset * .5}px)`;
      }
    });
  }

  ngOnChanges(){
    this.checkTint();
  }

}