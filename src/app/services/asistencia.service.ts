import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  //inicializar
  firestoreData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  //crear documento en firestore
  async crearDoc1(){
    //verificar si el user esta autenticado
    const user = await this.afAuth.currentUser;
    console.log('El usuario si esta autenticado')
    try{
      if (user) {
        //traigo el id del user
        const userId = user.uid;
        //el usuario que se logeo debe ser igual al uid para crear un doc de asistencia
        // ya que si no est su codigo aca no imparte clases
        if(userId){
          this.afAuth.authState.subscribe(user => {
            if(user){
              console.log('Entro al if del usuario');
              // const claseId = user.claseId;
              if(user){
                console.log('Entro al if del claseID');
                const newDoc = {
                  // claseId: claseId,
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
                console.log('El claseID es null o underfield')
              }
            }
          });
        }else{
          console.log('El usuario no imparte esta clase :)')
        }
      }else{
        console.log('El user no esta autenticado :)')
      }
    }
    catch(error){
      console.log('Error del primer try -->', error);
    }
  };
}
