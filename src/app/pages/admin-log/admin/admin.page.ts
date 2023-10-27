import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { claseModel } from 'src/app/models/clase';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  //inicializar la lisa
  users: any[]=[];
  usuarios$: Observable<any[]>;
  private usuariosCollection: AngularFirestoreCollection<any>; // Definimos la colección

  //inicializando
  userList: any[];

  constructor(
    public authService : AuthenticationService,
    private afStore: AngularFirestore,
    private _userServce: ApiService
  ) {
    //inicializar coleccion
    this.usuariosCollection = this.afStore.collection('usuarios');
  }

  ngOnInit() {
    this.listar();
  }

  async listar(){
    //obtener lista de user de la api
    this._userServce.getUsers().subscribe((data) => {
      this.userList = data;
    })
  }

}
