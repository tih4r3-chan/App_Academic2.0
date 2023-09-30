import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta-d',
  templateUrl: './cuenta-d.page.html',
  styleUrls: ['./cuenta-d.page.scss'],
})
export class CuentaDPage implements OnInit {

  //usuarios es un lista de datos de usuarios en duro para mostrar
  nombre: string = 'Pablo Campos';
  usuario: string = 'pa.campos@profesor.duoc.cl';
  tipo: string = 'profesor';
  telefono: string = '+569 42163829';
  direccion: string = 'Valparaiso';

  constructor() { }

  ngOnInit() {
  }

}
