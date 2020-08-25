import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment} from '../config/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { 
  }

  //Obtiene los registros que sean mas recientes que el recentArticle y mas antiguos que el Older_article
  public getAllArticles(recentArticle: number, olderArticle: number) {
   //Ejecuta una solicitud GET al servidor y devuelve un Observable 
   return this.http.get(`${enviroment.host}/articles.php?recent_article=${recentArticle}&older_article=${olderArticle}`);
  }

  //Al seleccionar un articulo, haz una consulta a la tabla articles y devuelve sus datos relacionados
  public getArticle( id_article: string) {
        //Ejecuta una solicitud GET al servidor y devuelve un Observable
         return this.http.get(`${enviroment.host}/articles.php?id_article=${id_article}`);

  }

  public searchArticles( search: string ) {
    //Formatea primero la busqueda
    search = this.formatSearch(search); 
    console.log(search);
    //Aqui va la lógica para hacer la consulta a la BD
    
  }

  public searchByHashtag( hashtag: string, recentArticle: number, olderArticle: number ){
    //Formatea primero la busqueda
    hashtag = this.formatSearch(hashtag);  
    console.log("Buscando por el hashtag " + hashtag);
    return this.http.get(`${enviroment.host}/articles.php?hashtag=${hashtag}&recent_article=${recentArticle}&older_article=${olderArticle}`);
  }

  //Formatea la cadena de busqueda, deja todo en minúsculas y quitas los espacios
  private formatSearch( search: string): string {
      return search.toLocaleLowerCase().replace(/\s/g,'');
  }

  //Devuelve un array con los valores contenidos en los hashtags
  public getHashValues( hashtags: string ): String[] {
      let hashValues: String[];
      hashValues = hashtags.split("#", 4); 
      if (hashValues.length == 0) {
        return [];
      } else {
        hashValues.shift();
        return hashValues; 
      }
  }
}
