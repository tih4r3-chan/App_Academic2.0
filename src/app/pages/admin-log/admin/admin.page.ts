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
    this.usuarios$ = this.usuariosCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      })
    )
  }

}
