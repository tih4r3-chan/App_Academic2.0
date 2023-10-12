import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  //crear documento en firestore
  async crearDoc1(){
    //verificar si el user esta autenticado
    const user = this.afAuth.currentUser;
    console.log('El usuario si esta autenticado')
    if (user) {
      const claseId = '6bPLYxFBlJ6EcnYObJi6';
      const newDoc = {
        asistio: false,
        claseId: claseId
      };
      this.firestore.collection('asistencia').add(newDoc)
      .then((docRef) => {
        console.log('Documento creado con ID -->', docRef);
      })
      .catch((error) => {
        console.log('Error al cread el doc: ', error);
      })
    }else{
      console.log('El user no esta autenticado :)')
    }
  }
}
