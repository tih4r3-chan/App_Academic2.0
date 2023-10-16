import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/firestore.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  //almacena la lista de los usuarios
  users: any[];
  datosModificados: any = {};

  constructor(
    public authService : AuthenticationService,
    private apiService : ApiService
  ) { }

  ngOnInit() {
  }


  //obtener los usuarios
  obtenerUsers(){
    this.apiService.getUsers().subscribe((data: any) => {
      this.users = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    });
  }

  //modificar usuarios
  guardarModificacion(){
    this.apiService.actualizarUser(this.datosModificados.id, this.datosModificados)
    .subscribe(() => {
      this.obtenerUsers();
    });
  }

}
