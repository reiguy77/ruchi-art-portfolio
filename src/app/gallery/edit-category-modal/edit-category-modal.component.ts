import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryService } from '../gallery.service';
import { Category } from 'src/app/models/Category';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { GalleryCategoryProperties } from 'src/app/shared/interfaces/galleryCategoryProperties.interface';

@Component({
  selector: 'edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.less']
})
export class EditCategoryModalComponent {
  
  @Input() categoryName = '';
  @Input() category:Category = new Category('');
  @Input() galleryCategoryProperties:GalleryCategoryProperties = {
    numColumnsLarge: '4', 
    showOverlay: true, 
    overlayColor: 'rgba(0, 0, 0, 0.158)', 
    numColumnsSmall: '1', 
    descriptionColor:'#000000'
  };
  categoryImages:File[] = [];
  activeTab = "tab1";

  constructor(private modalService:NgbActiveModal, private galleryService:GalleryService,
    private confirmationService:ConfirmationService, private imageService:ImageService){
  
  }

  ngAfterViewInit() {
    console.log(this.category);
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (navLink) {
      navLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default behavior
        const tabId = (event.target as HTMLAnchorElement).getAttribute('href')?.substring(1); // Type assertion
        if(tabId)
        {
          const tabContent = document.getElementById(tabId);
          if (tabContent) {
            tabContent.classList.add('show', 'active');
          }
        }
      });
    });
  }

  showTab(tab:string){
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((tab)=>{
      tab.classList.remove('active');
    })
    const tabContents = document.querySelectorAll('.tab-pane');
    tabContents.forEach((tab)=>{
      tab.classList.remove('show', 'active');
    })
    let tabElement = document.getElementById(tab+'-tab');
    tabElement?.classList.add('active');
    let tabContent = document.getElementById(tab);
    tabContent?.classList.add('show', 'active');
  }
  
  addImages(files:any){
    this.categoryImages = files;
  }

  close() {
    this.modalService?.close();
  }

  confirm() {
    if(this.activeTab == "tab1"){
      this.imageService.addImages(this.category.name, this.categoryImages);
      this.modalService?.close({categoryName: this.categoryName, categoryImages: this.categoryImages});
    }
    if(this.activeTab == "tab2"){
      this.modalService.close({action:"updateProperties", galleryCategoryProperties:this.galleryCategoryProperties})
    }
  }

  deleteCategory(){
    let callback = () => {
      this.galleryService.deleteCategory(this.category);
      this.modalService.close();
      window.location.href = '/about-me';
    }
    this.confirmationService.openConfirmModal('Delete Category', `Delete Category "${this.category.name}"`, callback);
  }

}
