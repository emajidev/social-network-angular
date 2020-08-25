import { Component, OnInit, Input,ViewChild, Output,EventEmitter} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  animation,
  // ...
} from '@angular/animations'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

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

export class LoginComponent implements OnInit {
  
  @Input() showLogin: boolean;
  @Output() hideLogin = new EventEmitter<boolean>();

 
  exitLogin(){
    this.hideLogin.emit(false);
  }
  constructor() { }
  
  ngOnInit() {
  
  }

}
