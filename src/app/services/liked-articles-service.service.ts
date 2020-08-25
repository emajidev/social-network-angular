import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment} from '../config/enviroment';
import { reject } from 'q';
import { ArticlesUtil } from '../util/articles.util';

@Injectable({
  providedIn: 'root'
})
export class LikedArticlesService {
  likedArticles = [];
  
  constructor(private http: HttpClient) { }

  //Extrae de la BD , data relacionada a todos los articulos gustados del usuario
  public myLikes(id_user: number) {
      return new Promise( (resolve, reject)=> {
        this.http.get(`${enviroment.host}/liked_articles.php?id_user=${id_user}`) 
        .subscribe((res:any[])=> {
          this.onSuccess(res);
          resolve();
         });
      });

  }

  private onSuccess(res) {
    if (res != undefined) {
      this.likedArticles = []; //Limpia la variable
      //Itera sobre el array de la respuesta JSON
      res.forEach((res: any, index: number) => {
        this.likedArticles.push(res);
      });
    }
    console.log("User favorite articles:");
    console.log(this.likedArticles);
  }

  //Agrega en la BD un nuevo articulo gustado
  public addToLiked(likedArticle: any) {
      return this.http.post(`${enviroment.host}/liked_articles.php`, JSON.stringify(likedArticle));
  }

    //Remove el articulo favorito en la BD
  public removeLike(id_article: number, id_user:number) {
      return this.http.delete(`${enviroment.host}/liked_articles.php?id_article=${id_article}&id_user=${id_user}`, )
  }

  //Remover el articulo de la lista de articulos gustados del usuario
  public removeFromList(id_article: number):void {
    this.likedArticles = ArticlesUtil.prototype.removeArticleFromList(id_article, this.likedArticles);

  }

  //Verifica si el articulo cargado pertenece a la lista de aticulos gustados del usuario
  public isLiked(id_article: number): boolean {
      for (let i=0; i < this.likedArticles.length; i ++) {
        if (this.likedArticles[i].id_article == id_article) {
          return true;
        }
      }
      return false; //Si no está en la lista de favoritos, devuelve false
    }

}
