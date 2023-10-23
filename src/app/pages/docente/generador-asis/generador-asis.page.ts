// import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-generador-asis',
  templateUrl: './generador-asis.page.html',
  styleUrls: ['./generador-asis.page.scss'],
})
export class GeneradorAsisPage implements OnInit {

  //inicializando
  firestoreData: any[];
  claseList: any;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    //mostrar datos con httpClient
    this.newDoc();
  }

  newDoc(){
    this.claseList = this.apiService.getClases().subscribe((data: any) => {
      console.log(data);
    });
  }


}
