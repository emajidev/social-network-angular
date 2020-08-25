import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'; //Permite hacer la navegación interna en el controlador

import {
  trigger,
  state,
  style,
  animate,
  transition,
  animation,
  // ...
} from '@angular/animations'; // permite importar los elemtos a configurar de animations

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  //aqui se configurar los parametros de estados y de transiciones para la animaciones//
  animations: [
    trigger('aniMenu', [      
      transition(':enter', [
        style({ backgroundColor: 'white',opacity: 0  }),
        animate(500)
      ]),
      transition(':leave', [
        animate(500, style({ backgroundColor: 'white',opacity: 0 }))
      ]),
      state('*', style({ backgroundColor: '#baffe8f6',opacity: 1 })),
    ]),
    trigger('aniLogin', [      
      transition(':enter', [
        style({ opacity: 0 }),
        animate(100)
      ]),
      transition(':leave', [
        animate(100, style({opacity: 0 }))
      ]),
      state('*', style({opacity: 1 })),
    ])
  ]
  
  
})

export class HeaderComponent implements OnInit {
  showLogin:boolean ;
  showSysPosts:boolean;
  isMenuOpen = false;
  onFavPage = false;
  onPost = false;
  placeholder = true;
  
  hashActived: boolean = false; //Bandera que determina si el susuario quiere que se agregue el hash de forma automatica
  
  funCambiar(e){
    console.log(e);
    this.showLogin = e;
   
  }
  funSysPosts(e){
    console.log(e);
    this.showSysPosts = e;
   
  }
 
  constructor( private router: Router, public activatedRoute:ActivatedRoute) { }
  state: string; // se crear una variable state tipo string ya que es un requerimiento de los elemntos del animations
  height = window.innerHeight; // alto
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
     
  ngOnInit() {
    //Chequea la url actual navegada por el usuario

    this.router.events
    .subscribe((event) => {
    if (event instanceof NavigationEnd) {
      console.log('NavigationEnd:', event);
      this.onFavPage = (event.url == "/favorites");
      }
     });
   
     
     

    this.showLogin = false;
    console.log('la altura es :',this.height);
  }

  clickLoginIn(){
    this.showLogin = true;
    console.log(this.showLogin , "click adentro");
  }

  //Ejecuta un enrutamiento interno, una vez que el usuario introduzca la busqueda
  search( searchItem: string ) {
    //Hago una pequeña validacion, no hacer nada si el termino es menor a una determinada cantidad de palabras
    if (searchItem.length <= 1) {
      return;
    }
    //Si no, hacemos la navegación
    //Chequea primero, si se activo la funcionalidad de agregar # automaticamente
    searchItem = (this.hashActived && searchItem[0] != "#")?("#"+ searchItem):(searchItem);
    this.router.navigate(['/search', searchItem]);
  }

  //Agregar automaticamente el simbolo # al oprimir el botón "#"
  enableAddHash() {
    console.log(this.hashActived);
    this.hashActived = true;
  }
   //No agregar el simbolo # al oprimir el botón "#"
   disableAddHash() {
    this.hashActived = false;
  }

}
