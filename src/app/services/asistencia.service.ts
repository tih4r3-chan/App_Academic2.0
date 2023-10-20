import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
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
    private apiService: ApiService,
    private route: ActivatedRoute
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
          const claseId = this.route.snapshot.paramMap.get('uid');
          this.apiService.mostrarClases(claseId).subscribe((data) => {
            this.clase = data;
            console.log(data.fields.nombre);
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
