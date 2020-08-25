import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article.interface';
import { FavoriteArticlesService } from '../services/favorite-articles.service';
import { ArticlesUtil } from '../util/articles.util';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  
  favoriteArticlesList:Article[] = [];
  processingFavorite: boolean = false;
  loadingArticles: boolean = false;
  constructor( public favoriteArticleService: FavoriteArticlesService) { }

  ngOnInit() {
    //Renderizar los articulos favoritos del usuario
    this.getArticles();
  }

  //Llama al servicio FavoritesArticlesService
  getArticles() {
    this.loadingArticles = true;
    this.favoriteArticleService.getAllArticles(1)
        .subscribe((res:Article[])=> {
          this.onSuccess(res);
        });
  }

  removeFromFavorite(id_article: number):void {
    if (!this.processingFavorite) {
      this.processingFavorite = true;
      this.favoriteArticleService.removeFavorite(id_article,1)
          .subscribe( 
            datos => {
              if (datos['resultado']=='OK') {
                console.log(datos['mensaje']);
                //Remueve el articulo en la lista de articulos favoritos del usuario
                this.favoriteArticleService.removeFromList(id_article);
                this.favoriteArticlesList = ArticlesUtil.prototype.removeArticleFromList(id_article,this.favoriteArticlesList);
                this.processingFavorite = false;
              }
            });
    }
  }

    //Los datos obtenidos de la BD se introducen al array articlesList
    onSuccess(res) {

      if (res != undefined) {
        //Itera sobre el array de la respuesta JSON
        res.forEach((res: Article, index: number) => {
          //Habilita el renderizado del icono favorite del articulo correspondiente
          res.isFavorite = true;
          //Agrega el articulo en la lista de articulos a renderizar
          this.favoriteArticlesList.push(res);
        });

        this.loadingArticles = false;
      }
    }

}
