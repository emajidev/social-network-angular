import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../config/enviroment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //Variable donde se almacenarán los articles registrados en la BD
  user: any[] = [];

  constructor(private http: HttpClient) { 

  }

  //Ejecuta una consulta a la BD users y devuelve los datos del usuario 
  public getUser( id_user: number) {
    //Ejecuta una solicitud GET al servidor y devuelve un Observable
    return this.http.get(`${enviroment.host}/users.php?id_user=${id_user}`);
  }

  //Devuelve una cadena con las redes sociales registradas por el usuario
  public getSocialLinks( socialLinks: string): any[] {
    return socialLinks.split(';');
  }

}