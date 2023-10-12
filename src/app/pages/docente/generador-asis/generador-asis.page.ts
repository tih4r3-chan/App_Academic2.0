import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generador-asis',
  templateUrl: './generador-asis.page.html',
  styleUrls: ['./generador-asis.page.scss'],
})
export class GeneradorAsisPage implements OnInit {

  constructor(
    private asistenciaService: AsistenciaService,
  ) { }

  ngOnInit() {
  }

  //asistencia clase 1 --> 6bPLYxFBlJ6EcnYObJi6
  newDoc1(){
    this.asistenciaService.crearDoc1();
  }

}
