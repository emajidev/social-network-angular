import { Component, OnInit, Input,ViewChild, Output,EventEmitter,VERSION, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  animation,
  // ...
} from '@angular/animations'; 
import { $ } from 'protractor';

@Component({
  selector: 'app-sys-posts',
  templateUrl: './sys-posts.component.html',
  styleUrls: ['./sys-posts.component.css'],
  animations: [
    trigger('aniPopup', [      
      transition(':enter', [
        style({ backgroundColor: 'white',opacity: 0  }),
        animate(500)
      ]),
      transition(':leave', [
        animate(500, style({ backgroundColor: 'white',opacity: 0 }))
      ]),
      state('*', style({ backgroundColor: '#baffe8f6',opacity: 1 })),
    ]),
  
  ]
})


export class SysPostsComponent implements OnInit {

  @Input() showSysPosts: boolean;
  @Output() hideSysPosts = new EventEmitter<boolean>();
// para obtener el archivo subido
  percentDone: number;
  uploadSuccess: boolean;
  
  size:any;
  width:number;
  height:number;
  
  @ViewChild('upLoadImg') imgType:ElementRef;
  version = VERSION;

  postForm: FormGroup; //Referencia al FormGroup del formulario para el post de articulos

  constructor(public fb: FormBuilder) { 

  }

  ngOnInit() {
    this.postForm = this.fb.group({
      "title":["" ,Validators.required],
      "size":["medium"], //Valor por defecto
      "details":["",Validators.required],
      "description":["", Validators.required],
      "hashValues": this.fb.array([
        this.fb.control("")
      ]),
      "hashtags":[""],
      "id_user":[""]
    });  
  }

  //Funcion para obtener una referencia al FormArray del FormGroup postForm
  get hashValues() {
    return this.postForm.get("hashValues") as FormArray;
  }

  //Agrega un nuevo control para un nuevo hashtag
  addHashtag() {
    this.hashValues.push(this.fb.control(''));
  }

  //Remover un control de hashtag
  removeHashtag() {
    console.log(`Remover ${this.hashValues.length}`);
    if (this.hashValues.length > 1) {
      this.hashValues.removeAt(this.hashValues.length - 1);
    }
  }

  parseHashValues(hashValues:FormArray): String{
    let hashtags =""; //Devuelve una cadena con todos los hashtags formateados
    for (let i = 0; i<hashValues.length; i++){
      hashtags+= "#"+hashValues.get(`${i}`).value;
    }
    return hashtags;
  }

  onSubmit() {
    //Procesa el arreglo de hashvalues
    this.postForm.get('hashtags').setValue(this.parseHashValues(this.hashValues));
    console.log(this.postForm.value);
  }



  // crear un trigger para que funcione el input file
  triggerFile(upLoadImg:HTMLElement) { 
    // do something 
     upLoadImg.click(); 
  } 
  onChange(e:any){
    // regExp Crea un objeto 'expresión regular' para encontrar texto de acuerdo a un patrón. "i" ignorar mayúsculas o minúsculas
    var extensions = new RegExp(/.jpg|.jpeg|.png|.gif/i);

    this.percentDone = 100;
    this.uploadSuccess = true;
    let image:any = e.target.files[0];
    this.size = Math.pow(10,-3)*(image.size);
    let fr = new FileReader;
    console.log(image.type);
    fr.onload = () => { // when file has loaded
     let img:any = new Image();
      // cargando imagen y aplicando validaciones
     img.onload = () => {
         this.width = img.width;
         this.height = img.height;
         console.log ("archivo presente:", img);
         // test permite buscar un texto dentro de un objeto(array) en este caso creado por RegExp
         if ( extensions.test(image.type) ){
          console.log ("el archivo es: " + image.name );
           if (this.width >1.1*(this.height)) {
            console.log (" rectangulo Horizontal ");
          }else if ( this.height > (this.width)*1.1 ) {
            console.log (" rectangulo Vertical ");
          }else {
            console.log("cuadrado");
          }
        }else{
          e.target.value='';
          img = '';
          this.percentDone =null;
          this.width = null;
          this.height = null ;
          this.size = null;
          
          alert("Formato no aceptado :( ");
          console.error("Formato no aceptado");
          console.log ("archivo presente a borrar:", img);
          
          
        }
         
     };
     img.src = fr.result; // This is the data URL 
     
    
};


  fr.readAsDataURL(image);
   this.imgType.nativeElement.value = "";
  
  }

  exitSysPosts(){
    this.hideSysPosts.emit(false);
  }



}
