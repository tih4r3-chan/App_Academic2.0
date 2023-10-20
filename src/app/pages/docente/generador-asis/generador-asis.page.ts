import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-generador-asis',
  templateUrl: './generador-asis.page.html',
  styleUrls: ['./generador-asis.page.scss'],
})
export class GeneradorAsisPage implements OnInit {

  //inicializando
  firestoreData: any[];

  constructor(
    private asistenciaService: AsistenciaService,
    private firestore: AngularFirestore,
    private appiserv: ApiService
  ) { }

  ngOnInit() {
    //mostrar datos de la clase uwu, Angular fire /
    this.firestore.collection('clase').valueChanges()
    .subscribe((data) => {
      this.firestoreData = data;
    })
  }

  //asistencia clase 1 --> 6bPLYxFBlJ6EcnYObJi6
  newDoc1(){
    this.asistenciaService.crearDoc1();
  }

  mostarClase(){
    console.log(this.appiserv)
  }

}
