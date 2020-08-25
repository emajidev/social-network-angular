import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
//Componentes
import { MasonryComponent } from "./masonry/masonry.component";
import { ArticleComponent } from "./article/article.component";
import { SearchComponent } from "./search/search.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { SysPostsComponent } from './sys-posts/sys-posts.component';

const app_routes: Routes = [
    { path: "home", component: MasonryComponent },
    { path: "article/:id", component: ArticleComponent },
    { path: "search/:searchItem", component: SearchComponent },
    { path: "favorites", component: FavoritesComponent},
    { path: "postear", component: SysPostsComponent},
    { path: "**", pathMatch:"full",redirectTo: 'home'  }, //ruta de redireccion por defecto    
]

@NgModule({
    imports: [
        RouterModule.forRoot(app_routes)
    ], 
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}