import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  //conectar api
  private apiUrl = 'https://firestore.googleapis.com/v1/projects/appacademic-bb066/database/(default)/documents';


  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient
  ) { }

  //crear documento en firestore
  crearDoc(coleccion: string, datos: any){
    const url = `${this.apiUrl}/${coleccion}`;
    const body = JSON.stringify({ asistencia: datos });

    //retorna
    return this.http.post(url, body, {
      params:{
        key: '',
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
