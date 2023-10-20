// import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-generador-asis',
  templateUrl: './generador-asis.page.html',
  styleUrls: ['./generador-asis.page.scss'],
})
export class GeneradorAsisPage implements OnInit {

  //inicializando
  firestoreData: any[];
  claseList: Observable<any[]>

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    //mostrar datos de la clase uwu, Angular fire /
    // this.firestore.collection('clase').valueChanges()
    // .subscribe((data) => {
    //   this.firestoreData = data;
    // })

    //mostrar datos con httpClient
    this.apiService.getClases().subscribe(data => {
      this.claseList = data;
    })
  }

  //asistencia clase 1 --> 6bPLYxFBlJ6EcnYObJi6
  newDoc(){
    this.apiService.crearDoc();
  }

  mostarClase(){
  }

}
