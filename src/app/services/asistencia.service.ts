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

    //obtener claseid
    // async obtenerClaseid() {
    //   return new Promise<string>((resolve, reject) => {
    //     //mostrar datos de la clase uwu, Angular fire / hhtp client me  tiraba error
    //     this.firestore.collection('clase').snapshotChanges()
    //     .subscribe((data) => {
    //       const claseData = data.map((item) => {
    //         const id = item.payload.doc.id;
    //         const data = item.payload.doc.data();
    //         return {
    //           id , data
    //         };
    //       });
    //       //lalogica
    //       claseData.forEach((clase, index) => {
    //         const claseId = clase.id;
    //         //ver si funciona
    //         console.log(`Clase ${index + 1}: ID = ${claseId}`)
    //       })
    //     });
    //   });
    // }

  //crear documento en firestore
  // async crearDoc(){
  //   //verificar si el user esta autenticado
  //   const user = this.afAuth.currentUser;
  //   console.log('El usuario si esta autenticado')
  //   if (user) {
  //     // obtener diamicamente la calseId
  //     this.obtenerClaseid()
  //     .then((claseId) => {
  //       const newDoc = {
  //         claseId: claseId,
  //         alumno1: {
  //           id: '6xaz6Y2gg5P2Yu6ftPXu80vhCti1',
  //           asistio: false
  //         },
  //         alumno2: {
  //           id: 'LE1b90lDV8aYNzpYh1hZpYr76OF2',
  //           asistio: false
  //         }
  //       };
  //       this.firestore.collection('asistencia').add(newDoc)
  //       .then((docRef) => {
  //         console.log('Documento creado con ID -->', docRef);
  //       })
  //       .catch((error) => {
  //         console.log('Error al crear el doc: ', error);
  //       })
  //     });
  //   }else{
  //     console.log('El user no esta autenticado :)')
  //   }
  // }

  async crearDoc(){
    //verificar si el user esta autenticado
    const user = this.afAuth.currentUser;
    //accedo a los datos de la clase
    const clasesData = this.firestore.collection('clase').snapshotChanges()
      .subscribe((data) => {
        const claseId = data.map((item) =>{
          const claseId = item.payload.doc.id;
          const data = item.payload.doc.data();
          return{claseId, data}
        })
      });
      console.log(clasesData,'La claseData');
    if(user){
      console.log('El usuario si esta autenticado')
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
      });
    };
  };
}
