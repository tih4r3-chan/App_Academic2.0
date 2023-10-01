import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  //inicializar la lisa
  usuarios$: Observable<any[]>;
  private usuariosCollection: AngularFirestoreCollection<any>; // Definimos la colección

  constructor(
    public authService : AuthenticationService,
    private afStore: AngularFirestore
  ) {
    //inicializar coleccion
    this.usuariosCollection = this.afStore.collection('usuarios');
  }

  ngOnInit() {
    this.listar();
  }

  listar() {
    //hacer consulta a los documentos de la coleccion usuarios, hy estara actualizada
    //snapshotChanges  metodo de AngularFirestoreCollection, devuelev observables, y se va actualizando junto a la base d edatos
    //pipe --> operador  que se utiliza para encadenar operaciones en un flujo de datos observable
    this.usuarios$ = this.usuariosCollection.snapshotChanges().pipe(
      // operacion que se aplica a los cambios del snap, actions obtiene los cambios sobre la coleccion
      map((actions) => {
        //iteracion de cambios indviduales sobre la coleciion(1 por 1)
        return actions.map((a) =>{
          //extrae datos del documento asociados al cabios, actualizado, todo lo relacionado con los usuarios
          const data = a.payload.doc.data();
          //extrael el UID del documento, unico
          const id = a.payload.doc.id;
          //se crea un objeto que combina el id con los datos de users
          return {id, ...data};
        });
      })
    );
  }

}
