import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistenciaList: any[];
  userData: any;
  userList: any[];
  asis: any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.verAsistencia();
  }

  //mostrar la sistencia correspondiente
  async verAsistencia() {
    //traigo el user almacenado en capacitos(solo tiene id y emil)
    const response  = await Preferences.get({key:'user'});
    if(response.value){
      this.userData = JSON.parse(response.value);
    }
    //obtener lista de user de la api(le paso a userData todo los datos que estan en la api)
    this.apiService.getUsers().subscribe((data) => {
      this.userList = data;
      //compara el uid extraido con el amacenado
      const usuarioEncontrado = this.userList.find((user) => user.uid === this.userData.uid);
      if(usuarioEncontrado){
        this.userData = usuarioEncontrado;
      }
    })

    //me traigo las asistencias
    this.apiService.getAsistencia().subscribe((asistencia)=>{
      this.asistenciaList = asistencia;
    });
  }
}
