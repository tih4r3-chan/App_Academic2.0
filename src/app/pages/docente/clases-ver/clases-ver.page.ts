import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-clases-ver',
  templateUrl: './clases-ver.page.html',
  styleUrls: ['./clases-ver.page.scss'],
})
export class ClasesVerPage implements OnInit {
  clasesDocente: any[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  //mostrar datos de clase
  async mostrarClases(){
    //verificar si el user esta autenticado
    const user = await this.afAuth.currentUser;
    console.log('El usuario si esta autenticado');
    //condicionde si el usuario esta autenticado
    if(user) {
      //se almacecnael id del use logeado
      const docenteId = user.uid;

      //consulta para ver las clase
      this.firestore.collection('clase',(ref) => ref.where('docente', '==', docenteId)
      .snapshotChanges()
      .suscribe((clases)=>{

      }));
    }
  }

}
