import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article.interface';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../interfaces/user.interface';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  //Variable en donde se almacenará el articulo
  article: Article; //Articulo
  author: User; //Autor del articulo
  socialLinks: any[]; //Redes sociales del autor del articulo
  commentForm: FormGroup; //Referencia al FormGroup de la sección de Comentarios
  commentsList: any[] = []; //Lista de comentarios renderizados 
  recentComment: number = 0; //Inicializa la variable que almacenará el ID del comentario más reciente
  olderComment: number = 0; //Inicializa la variable que almacenará el ID del comentario más antiguo
  loadingComments: boolean = false;
  constructor( private route: ActivatedRoute, 
               public articleService: ArticleService,
               public userService: UsersService,
               public commentsService: CommentsService,
               public fb: FormBuilder) {
                this.commentForm = fb.group({
                  'content':[''],
                  'id_article': [''],
                  'id_user': ['']
                });
               }

  ngOnInit() {
      //Al cargar el template, realiza la consulta a la BD y extrae el articulo solicitado
        this.route.params
      .subscribe(parametros => {
        console.log(parametros['id']);
        //Haz una consulta a la BD para obtener el articulo solicitado
        this.articleService.getArticle(parametros['id'])
            .subscribe( (resp: Article[]) => {
              this.article =resp[0];

              //Carga los datos del autor del articulo
              this.userService.getUser(this.article.id_user)
              .subscribe( (resp:User[]) => {
                  this.author = resp[0];
                  
                  //Carga en un arreglo las redes sociales del autor
                  this.socialLinks = this.userService.getSocialLinks(this.author.social_links);

                  //Inicializa los valores por defecto de la sección Comentarios
                  this.commentForm.controls["id_article"].setValue(this.article.id_article);
                  this.commentForm.controls["id_user"].setValue(1);
                  //Obtiene los comentarios asociados del articulo
                  this.getComments();
              }); 
            });

     });

  }

  //Registrar en la BD un nuevo comentario
  onSubmit(value: string): void {
    console.log('you submitted value:', value);
    this.commentsService.saveComment(value)
    .subscribe(datos => {
      if (datos['resultado']=='OK') {
        console.log(datos['mensaje']);
        //Actualizar la lista de comentarios 
        this.getComments();
        //Resetea el contenido del formulario
        this.commentForm.controls['content'].reset();
      }
    });    
  }

    //Llama al servicio comments para obtener una fracción de los comentarios
    getComments() {
      this.loadingComments = true;
      this.commentsService.getComments(this.recentComment, this.olderComment, this.article.id_article )
          .subscribe((res:Comment[])=> {
            this.onSuccess(res);
          });
    }

      //Los datos obtenidos de la BD se introducen al array commentsList
    onSuccess(res) {
      console.log(res);
      if (res != undefined) {
        //Itera sobre el array de la respuesta JSON
        res.forEach((res: any, index: number) => {
          let numberComment: number = res.id_comment;
          //Toma el comentario más reciente de esa porción
          this.recentComment = (this.recentComment < numberComment)? numberComment: this.recentComment;
          //Toma el comentario mas antiguo de esa porción
          this.olderComment = (this.olderComment > numberComment)? numberComment: ((this.olderComment == 0)? numberComment: this.olderComment); 
          //Agrega el comentario en la lista de comentarios a renderizar 
           this.commentsList.push(res); 
        });
      }
      this.loadingComments = false;
      console.log("recentComment: "+this.recentComment);
      console.log("olderComment: "+this.olderComment);
    }

  //Vuelve a solicitar mas comentarios cuando se hace un scroll Down
  onScroll() {
    console.log("Scroll Down, se buscará más comentarios");
    //Por mejorar
    if (!this.loadingComments) {
        this.getComments();
    } 
  }
}
