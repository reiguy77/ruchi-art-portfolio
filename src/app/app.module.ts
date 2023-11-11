import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { HeroImageComponent } from './hero-image/hero-image.component';
import { HttpClientModule } from '@angular/common/http';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
// import {ScrollingModule} from "@angular/cdk/scrolling";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { ImagePropertiesEditorComponent } from './image-properties-editor/image-properties-editor.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { EditableTextComponent } from './shared/components/editable-text/editable-text.component';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { AddCategoryModalComponent } from './gallery/add-category-modal/add-category-modal.component';
import { EditCategoryModalComponent } from './gallery/edit-category-modal/edit-category-modal.component';
import { ConfirmationModalComponent } from './shared/components/confirmation-modal/confirmation-modal.component';
import { EditableImageComponent } from './shared/components/editable-image/editable-image.component';
import { ChangeImageModalComponent } from './shared/components/editable-image/change-image-modal/change-image-modal';
import { DragAndDropComponent } from './shared/components/drag-and-drop/drag-and-drop.component';
import { NgForOf, NgIf } from '@angular/common';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    AboutMeComponent,
    ContactComponent,
    HeroImageComponent,
    PhotoGalleryComponent,
    ImagePropertiesEditorComponent,
    ColorPickerComponent,
    ToolbarComponent,
    LoginComponent,
    EditableTextComponent,
    ImageUploadComponent,
    AddCategoryModalComponent,
    EditCategoryModalComponent,
    ConfirmationModalComponent,
    EditableImageComponent,
    ChangeImageModalComponent,
    DragAndDropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LightgalleryModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ColorPickerModule,
    FormsModule,
    NgbModule,
    NgForOf,
    NgIf,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    GridsterComponent,
    GridsterItemComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
