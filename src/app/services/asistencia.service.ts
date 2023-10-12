import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  constructor(
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
        claseId: claseId,
        alumno1: {
          id: '6xaz6Y2gg5P2Yu6ftPXu80vhCti1',
          asistio: false
        },
        alumno2: {
          id: 'LE1b90lDV8aYNzpYh1hZpYr76OF2',
          asistio: false
        }
      };
      this.firestore.collection('asistencia').add(newDoc)
      .then((docRef) => {
        console.log('Documento creado con ID -->', docRef);
      })
      .catch((error) => {
        console.log('Error al crear el doc: ', error);
      })
    }else{
      console.log('El user no esta autenticado :)')
    }
  }
}
