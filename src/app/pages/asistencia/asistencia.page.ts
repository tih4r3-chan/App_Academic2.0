import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { Asistencia } from 'src/app/models/asistencia';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistenciaList: Asistencia[];
  // userData: any;
  userList: any[];
  asis: any;
  lista: any;
  asistio: any;

  asistenciasUsuario: Asistencia[];
  userData: any;

  asistenciasToShow: any[] = [];


  constructor(
    private apiService: ApiService,
    private firestore: AngularFirestore
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
    this.apiService.getAsistencia().subscribe((asistencias) =>{
      this.asis = asistencias.filter(item => item.claseId === this.userData.claseId)
      const lista = this.asis.map((item:any) => item.listaA)
      // Recorrer la lista e imprimir si asistió o no
      for (let i = 0; i < lista.length; i++) {
        const arrayInterno = lista[i];
        // console.log(arrayInterno);
        const fecha = this.asis[i].fecha;
        const dia = this.asis[i].dia;
        const hora = this.asis[i].hora;
        const nombreDocente = this.asis[i].nombreDocente;

        console.log(fecha, dia, hora, nombreDocente)
        for (let j = 0; j < arrayInterno.length; j++) {

          const usuario = arrayInterno[j];
          if (usuario.id.mapValue.fields.stringValue.stringValue === this.userData.uid) {
            // console.log(usuario)
            const asistenciaData = {
              fecha: fecha,
              dia: dia,
              hora: hora,
              nombreDocente: nombreDocente,
              asistio: usuario.asistio.mapValue.fields.booleanValue.booleanValue
            };
            // console.log(asistenciaData);
            this.asistenciasToShow.push(asistenciaData);
          }
        }
      }
    });
  }
}
