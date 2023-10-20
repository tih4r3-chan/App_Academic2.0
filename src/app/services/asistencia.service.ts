import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApiService } from 'src/app/services/api.service'


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  //inicializar
  firestoreData: any;
  clase: any;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private apiService: ApiService
  ) { }

  //crear documento en firestore
  async crearDoc1(){}
    //verificar si el user esta autenticado
}
