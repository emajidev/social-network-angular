import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment} from '../config/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }


  //Registra un nuevo comentario en la BD comments
  public saveComment(comment: string) {
      return this.http.post(`${enviroment.host}/comments.php`, JSON.stringify(comment));
  }


  //Al seleccionar un articulo, haz una consulta a la tabla articles y devuelve sus datos relacionados
  public getComments(recentComment: number, olderComment: number,idArticle: number) {
    //Ejecuta una solicitud GET al servidor y devuelve un Observable
     return this.http.get(`${enviroment.host}/comments.php?recent_comment=${recentComment}&older_comment=${olderComment}&id_article=${idArticle}`);

  }
}