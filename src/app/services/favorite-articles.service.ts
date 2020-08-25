import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment} from '../config/enviroment';
import { reject } from 'q';
import { ArticlesUtil } from '../util/articles.util';
@Injectable({
  providedIn: 'root'
})
export class FavoriteArticlesService {
  favoriteArticles = []; //Almacenará data de los articulos favoritos del usuario
  
  constructor(private http: HttpClient) { 
    //Trae todos los articulos favoritos del usuario
  //  this.myFavorites(1);
  }

  //Agrega en la BD un nuevo articulo favorito del usuario
  public addToFavorite(favoriteArticle: any) {
      return this.http.post(`${enviroment.host}/favorite_articles.php`, JSON.stringify(favoriteArticle));
  }

  public myFavorites(id_user: number) {
      return new Promise( (resolve, reject)=> {
        this.http.get(`${enviroment.host}/favorite_articles.php?id_user=${id_user}`) 
        .subscribe((res:any[])=> {
          this.onSuccess(res);
          resolve();
         });
      });  
  }

  public getAllArticles(id_user: number) {
    //Ejecuta una solicitud GET al servidor y devuelve un Observable 
    return this.http.get(`${enviroment.host}/favorite_articles.php?id_user=${id_user}&all_articles=yes`);
   }

  private onSuccess(res) {
    if (res != undefined) {
      //Itera sobre el array de la respuesta JSON
      this.favoriteArticles = []; //Limpia la variable
      res.forEach((res: any, index: number) => {
        this.favoriteArticles.push(res);
      });
    }
    console.log("User favorite articles:");
    console.log(this.favoriteArticles);
  }

  //Verifica si el articulo cargado pertenece a la lista de aticulos favoritos del usuario
  public isFavorite(id_article: number): boolean {
    for (let i=0; i < this.favoriteArticles.length; i ++) {
      if (this.favoriteArticles[i].id_article == id_article) {
        return true;
      }
    }
    return false; //Si no está en la lista de favoritos, devuelve false

  }
  //Remove el articulo favorito en la BD
  public removeFavorite(id_article: number, id_user:number) {
    return this.http.delete(`${enviroment.host}/favorite_articles.php?id_article=${id_article}&id_user=${id_user}`, )
  }

  //Remover el articulo de la lista de favoritos del usuario
  public removeFromList(id_article: number):void {
    this.favoriteArticles = ArticlesUtil.prototype.removeArticleFromList(id_article, this.favoriteArticles)
/*     for(var i = 0; i < this.favoriteArticles.length; i++) {
      if(this.favoriteArticles[i].id_article === id_article) {
        this.favoriteArticles.splice(i, 1);
        break;
      }
    } */
  }

}
