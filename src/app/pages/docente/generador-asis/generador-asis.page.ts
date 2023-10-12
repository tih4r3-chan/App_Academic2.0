import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generador-asis',
  templateUrl: './generador-asis.page.html',
  styleUrls: ['./generador-asis.page.scss'],
})
export class GeneradorAsisPage implements OnInit {
  //inicializar var
  claseData: any;

  constructor(
    private asistenciaService: AsistenciaService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    //mostrar datos de la clase 1
    const claseId = '6bPLYxFBlJ6EcnYObJi6';
    //solicitud get para traer los datos almacenados
    this.http.get<any>(`https://firestore.googleapis.com/v1/project/AppAcademic/databases/(default)/documents/clase/${claseId}`)
    .subscribe((data) => {
      this.claseData = data
    })
  }

  //asistencia clase 1 --> 6bPLYxFBlJ6EcnYObJi6
  newDoc1(){
    this.asistenciaService.crearDoc1();
  }

}
