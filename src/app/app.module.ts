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
// import {ScrollingModule} from "@angular/cdk/scrolling";
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { SideEditorComponent } from './side-editor/side-editor.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { EditableTextComponent } from './shared/components/editable-text/editable-text.component';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    AboutMeComponent,
    ContactComponent,
    HeroImageComponent,
    PhotoGalleryComponent,
    SideEditorComponent,
    ColorPickerComponent,
    ToolbarComponent,
    LoginComponent,
    EditableTextComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LightgalleryModule,
    BrowserAnimationsModule,
    // ScrollingModule,
    ColorPickerModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
