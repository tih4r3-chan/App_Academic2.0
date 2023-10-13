import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  //inicializar
  firestoreData: any;
  id: string;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async crearDoc(claseId: string){
    //verificar si el user esta autenticado
    const user = this.afAuth.currentUser;
    if(user){
      console.log('usuario esta autenticado :)')
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
      });
    }else{
      console.log('User no autenticado :)')
    }
  };
}
