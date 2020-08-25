import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article.interface';
import { FavoriteArticlesService } from '../services/favorite-articles.service';
import { LikedArticlesService } from '../services/liked-articles-service.service';
import { ArticlesUtil } from '../util/articles.util';
import {
  trigger,
  state,
  style,
  animate, 
  keyframes,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('openBright', [
      // ...
      state('open', style({
        opacity: 0,
        borderRadius:"10px",

        
        
      })),
      state('closed', style({
       
        opacity: 0,
        borderRadius:"10px",

      })),
      
      transition('closed => open', [
        animate(900, keyframes([
          style({opacity: 0, color:"#fff", transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, color:"#fff", transform: 'translateX(15px)',  offset: 0.2}),
          style({opacity: 1, color:"#fff", transform: 'translateX(20px)',     offset: 0.9}),
          style({opacity: 0, color:"#fff", transform: 'translateX(100px)',     offset: 1.0}),
          
        ]))
      ]),
    ]),
    trigger('closedBright', [
      // ...
      state('open', style({
        opacity: 0,
        borderRadius:"10px",
        
        
      })),
      state('closed', style({
       
        opacity: 0,
        borderRadius:"10px",
      })),
      
      transition('open => closed', [
        animate(900, keyframes([
          style({opacity: 0, color:"#fff",backgroundColor:"#000" , transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, color:"#fff",backgroundColor:"#000", transform: 'translateX(15px)',  offset: 0.2}),
          style({opacity: 1, color:"#fff",backgroundColor:"#000", transform: 'translateX(20px)',     offset: 0.9}),
          style({opacity: 0, color:"#fff",backgroundColor:"#000", transform: 'translateX(100px)',     offset: 1.0}),
          
        ]))
      ]),
    ]),
  
  ]
})
export class SearchComponent implements OnInit {

  searchList: Article[] = []; //Iniciliza con un array de Articles vacio
  lastSearch: string = ""; //Recordar la ultima busqueda
  hashtag: string = ""; //Variable que hará de referencia al item de busqueda por Hashtag
  recentArticle: number = 0; //Inicializa la variable que almacenará el número de articulo del articulo más reciente
  olderArticle: number = 0; //Inicializa la variable que almacenará el número de articulo del articulo más antiguo
  loadingArticles: boolean = false; //Bandera que indicará si se están procesando articulos a renderizar
  processingFavorite: boolean = false; //Bandera que indica si se está procesando un favorite
  processingLike: boolean = false; //Bandera que indica si se está procesando un like

  constructor(  private route: ActivatedRoute,
                private router: Router,
                public articlesService: ArticleService, 
                public favoriteArticleService: FavoriteArticlesService,
                public likedArticlesService: LikedArticlesService) { }
                
  ngOnInit() {
    console.log("iniciando el search/");
    this.searchArticles();
  }


  searchArticles() {
    this.loadingArticles = true;
    this.route.params
    .subscribe( params => {
      if (params['searchItem'] != this.lastSearch) {
        //Resetea el array de elementos encontrados y las varibles que hacen referencia al articulo mas recuiente y al mas antiguo
        this.searchList.length = 0;
        this.recentArticle = 0;
        this.olderArticle = 0;
        //Guarda la ultima busqueda
        this.lastSearch = params['searchItem']; 
      }
      console.log("llego aqui");
      //Verifica si el item a buscar es un hastag, si lo es, busca por hashtags
      if (this.checkHashtag(params['searchItem'])) {
          this.hashtag = params['searchItem'];
          this.hashtag = this.hashtag.slice(1, this.hashtag.length);
          //Busca por hashtag

          //Carga primero la info relacionada a los articulos favoritos, los likes y luego carga los articulos
          this.favoriteArticleService.myFavorites(1) 
          .then( ()=> {
          this.likedArticlesService.myLikes(1)
          })  
          .then( () => {
            this.articlesService.searchByHashtag(this.hashtag, this.recentArticle, this.olderArticle)
            .subscribe( (res: Article[]) => {
              this.onSuccess(res);
            });
          });
      }
    });
  }

  checkHashtag( searchItem: string):boolean {
    //Chequea si el primer caracter contiene el simbolo almohadilla:
    return (searchItem[0] == "#");
  }

    //Agregar el articulo a la lista de Favoritos
    addToFavoriteArticles( id_article: number): void {
      if (!this.processingFavorite){
          this.processingFavorite = true;
          let favoriteArticle = {
            'id_article': id_article,
            'id_user': 1
          } //Objeto a enviar, el id_user corresponderá al usuario logeado
          console.log(favoriteArticle);
          this.favoriteArticleService.addToFavorite(favoriteArticle)
          .subscribe(datos => {
            if (datos['resultado']=='OK') {
              console.log(datos['mensaje']);
              //Renderiza el icono favorite del articulo correspondiente
              let indexArticle = ArticlesUtil.prototype.findArticle( this.searchList, "id_article", id_article);
              this.searchList[indexArticle].isFavorite = true;
              this.processingFavorite = false;
            }
          });
      }
  
    }
  
      //Agregar el articulo a la lista de Me gusta
      addToLikedArticles( id_article: number): void {
        if (!this.processingLike){
            this.processingLike = true;
            let likedArticle = {
              'id_article': id_article,
              'id_user': 1
            } //Objeto a enviar, el id_user corresponderá al usuario logeado
            console.log(likedArticle);
            this.likedArticlesService.addToLiked(likedArticle)
            .subscribe(datos => {
              if (datos['resultado']=='OK') {
                console.log(datos['mensaje']);
                //Actualiza la propiedad likes del objeto Article correspondiente
                let indexArticle = ArticlesUtil.prototype.findArticle( this.searchList, "id_article", id_article);
                this.searchList[indexArticle].likes = datos["mensaje"];
                //Renderiza el like en el icono del articulo correspondiente
                this.searchList[indexArticle].isLiked = true;
                this.processingLike = false;
              }
            });
        }
    
      }
  
  
    removeFromFavorite(id_article: number):void {
      if (!this.processingFavorite) {
        this.processingFavorite = true;
        this.favoriteArticleService.removeFavorite(id_article,1)
            .subscribe( 
              datos => {
                if (datos['resultado']=='OK') {
                  console.log(datos['mensaje']);
                  //Renderiza el icono favorite del articulo correspondiente
                  let indexArticle = ArticlesUtil.prototype.findArticle( this.searchList, "id_article", id_article);
                  this.searchList[indexArticle].isFavorite = false;
                  //Remueve el articulo en la lista de articulos favoritos del usuario
                  this.favoriteArticleService.removeFromList(id_article);
                  this.processingFavorite = false;
                }
              });
      }
    }
    //Remueve el like para un articulo seleccionado
    removeLike(id_article: number):void {
      if (!this.processingLike) {
        this.processingLike = true;
        this.likedArticlesService.removeLike(id_article,1)
            .subscribe( 
              datos => {
                if (datos['resultado']=='OK') {
                  console.log(datos['mensaje']);
                  //Actualiza la propiedad likes del objeto Article correspondiente
                  let indexArticle = ArticlesUtil.prototype.findArticle( this.searchList, "id_article", id_article);
                  this.searchList[indexArticle].likes = datos["mensaje"];
                  //Renderiza el like en el icono del articulo correspondiente
                  this.searchList[indexArticle].isLiked = false;
                  //Remueve el articulo en la lista de articulos gustados del usuario
                  this.likedArticlesService.removeFromList(id_article);
                  this.processingLike = false;
                }
              });
      }
    }
    //Redirecciona a /search  si el usuario hace click en un hashtag de los articulos
    searchHashtag( searchItem: string ) {
      //Hago una pequeña validacion, no hacer nada si el termino es menor a una determinada cantidad de palabras
      if (searchItem.length <= 1) {
        return;
       }
       //Fomatea el valor
       searchItem = (searchItem[0] != "#")?("#"+ searchItem):(searchItem);
       this.router.navigate(['/search', searchItem]);
    }

    //Los datos obtenidos de la BD se introducen al array searchList
  onSuccess(res) {
    console.log(res);
    if (res != undefined) {
      //Itera sobre el array de la respuesta JSON
      res.forEach((res: Article) => {
        //El atributo number_article da información sobre cual es el mas reciente (el mayor de todos)
        let numberArticle: number = res.number_article;
        //Toma el articulo más reciente
        this.recentArticle = (this.recentArticle < numberArticle)? numberArticle: this.recentArticle;
        //Toma el articulo más antiguo de esa porción
        this.olderArticle = (this.olderArticle > numberArticle)? numberArticle: ((this.olderArticle == 0)? numberArticle: this.olderArticle);

        //Determina si el articulo se encuentra en la lista de articulos favoritos del usuario
        res.isFavorite = this.favoriteArticleService.isFavorite(res.id_article);
        //Determina si el articulo se encuentra en la lista de articulos gustados del usuario
        res.isLiked = this.likedArticlesService.isLiked(res.id_article);    
        //Procesa los hashtags, extrayendo cada palabra y almacenandola en un array
        res.hashValues = this.articlesService.getHashValues(res.hashtags);    

        //Agrega el articulo en la lista de articulos a renderizar 
         this.searchList.push(res);
      });
      this.loadingArticles = false;
    }
  }

  //Vuelve a solicitar mas articulos cuando se hace un scroll Down
  onScroll() {
    console.log("Srolled");
    //Solicita mas articulos
    this.articlesService.searchByHashtag(this.hashtag, this.recentArticle, this.olderArticle)
        .subscribe( (res: Article[]) => {
              this.onSuccess(res);
        });
    }
}
