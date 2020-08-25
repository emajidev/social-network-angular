import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { MasonryComponent } from './masonry/masonry.component';
import { ArticleComponent } from './article/article.component';

//Services
import { ArticleService } from './services/article.service';


//Routing
import { AppRoutingModule } from './app-routing.module';

//Infinite Scroll
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchComponent } from './search/search.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SysPostsComponent } from './sys-posts/sys-posts.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MasonryComponent,
    ArticleComponent,
    SearchComponent,
    LoginComponent,
    FavoritesComponent,
    SysPostsComponent,
    
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
  ],
  
  providers: [ArticleService],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
