import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { Asistencia } from 'src/app/models/asistencia';
import { claseModel } from 'src/app/models/clase';

@Component({
  selector: 'app-asistencia-qr',
  templateUrl: './asistencia-qr.page.html',
  styleUrls: ['./asistencia-qr.page.scss'],
})
export class AsistenciaQrPage implements OnInit {
  userData: any;
  userList: any[];

  asisData: any;

  //inicializando
  clases: claseModel[];
  aistencia: any[];

  //inicializando
  clasess: any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.leerUSer();
    this.mostrarData();

    //traer los datos de la clase
    this.apiService.getAsistencia().subscribe((data: Asistencia[]) => {
      // Aquí puedes acceder a los datos y hacer lo que necesites
      this.aistencia = data;
      console.log(this.aistencia)
    });

    //traer los datos de la clase
    this.apiService.getClases().subscribe((data: claseModel[]) => {
      // Aquí puedes acceder a los datos y hacer lo que necesites
      this.clases = data;
      // console.log(this.clases);
    });

    //obtener lista de user de la api
    this.apiService.getUsers().subscribe((data) => {
      this.userList = data;
      //compara el uid extraido con el amacenado
      this.userList.forEach((user)=>{
        //este es uid almacenado en capacitor
        const uid = user.uid;
        if(this.userData && this.userData.uid === uid){
          // this.userData = user;
        }
      })
    })
  }

  //trae los datos del capcitor que estsan almacenados
  async leerUSer(){
    const response  = await Preferences.get({key:'user'});
    if(response.value){
      this.userData = JSON.parse(response.value);
      //me trae el id del usuario
      const idUser = this.userData.uid;
      // console.log(idUser);
    }
  }

  //modificar si asistio o no
  async modificarAsistencia() {
    if(this.userData){
      // Obtén la claseId del usuario logeado
      const claseIdUsuario = this.userData.claseId;
      if(claseIdUsuario){

      }
    }
  }

  async mostrarData(){
    //traigo el user almacenado
    const response  = await Preferences.get({key:'user'});
    if(response.value){
      this.userData = JSON.parse(response.value);
    }

    //obtener lista de user de la api
    this.apiService.getUsers().subscribe((data) => {
      this.userList = data;
      //compara el uid extraido con el amacenado
      const usuarioEncontrado = this.userList.find((user) => user.uid === this.userData.uid);
      if(usuarioEncontrado){
        this.userData = usuarioEncontrado;
        // console.log(usuarioEncontrado);
      }
    })

    //traer los datos de la clase
    this.apiService.getClases().subscribe((data) => {
      this.clases = data;
      // console.log(this.clases);

      //almacenar el usuario, el uid
      const uidUSer = this.userData.claseId;
      // console.log(uidUSer);
      //concidencia con la clase
      const claseSeleccionada = this.clases.find((clase: any)=>clase.uid === uidUSer);
      if(claseSeleccionada){
        this.clasess = claseSeleccionada;
      }
    });
  }

}
