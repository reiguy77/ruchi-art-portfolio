import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: '', component: HomeComponent
  // },
  { path: 'about-me', component: AboutMeComponent},
  { path: 'contact', component: ContactComponent},

  { path: 'login', component: LoginComponent},
  
  { path: 'gallery/:category', component: GalleryComponent},
  
  {path: '**', redirectTo: 'about-me', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
