import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {
  //recibe parametros
  @Input() control!: FormControl; // esta sininicializar
  @Input() type!: string;  //tipo
  @Input() label!: string; //para identificar en que input se esta escribiendo
  @Input() autocomplete!:string; // autocompletar
  @Input() icon!: string; //para pasar iconos uwu

  //crear el icon para ver o no la contraseña
  isPassword!: boolean; //variable para identificar si la variable es de tipo password
  hide: boolean = true; //para decir si esta o no oculta

  constructor() { }

  ngOnInit() {
    //para que solo aparesca en el password
    if (this.type == 'password') this.isPassword = true;
  }

  //crear funcion para ocultar o mostrar la contraseña
  showOrHidePassword() {
    //cuando la persona presione hide, cambiara de true a false y asi
    this.hide = !this.hide;
    //condicional, que si hide es verdadero se mostraran lso puntitos y si no el texto escrito
    if (this.hide === true) {
      this.type = 'password';
    } else {
      this.type = 'text';
    }
  }

}
