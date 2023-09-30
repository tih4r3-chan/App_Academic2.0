import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  //usuarios es un lista de datos de usuarios en duro para mostrar
  nombre: string = 'Tihare Campusano';
  usuario: string = 'ti.campusano@duocuc.cl';
  tipo: string = 'alumno';
  telefono: string = '+569 35562325';
  direccion: string = 'Viña del mar';


  constructor() { }

  ngOnInit() {
  }

}
