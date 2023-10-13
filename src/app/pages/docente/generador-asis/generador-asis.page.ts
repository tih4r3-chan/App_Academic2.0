import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-generador-asis',
  templateUrl: './generador-asis.page.html',
  styleUrls: ['./generador-asis.page.scss'],
})
export class GeneradorAsisPage implements OnInit {

  //inicializando
  firestoreData: any[];
  //inicializar el campo que almacenara el id
  selectedClaseId: string | null = null;

  constructor(
    private asistenciaService: AsistenciaService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    //mostrar datos de la clase uwu, Angular fire /
    this.firestore.collection('clase').valueChanges()
    .subscribe((data) => {
      this.firestoreData = data;
    })
  }

  //asistencia clase 1 --> 6bPLYxFBlJ6EcnYObJi6
  newDoc(claseId: string){
    this.selectedClaseId = claseId;
    this.asistenciaService.crearDoc(claseId);
  }

}
