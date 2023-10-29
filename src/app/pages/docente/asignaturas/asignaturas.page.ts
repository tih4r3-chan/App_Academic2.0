import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  //inicializando
  clases: any;

  lista: any;

  userData: any;
  userList: any[];

  constructor(
    private apiService: ApiService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.mostrarData();

    //traer alumnos
  this.apiService.getExtra().subscribe((data) => {
    this.lista = data;
    //almacenar el usuario, el uid
    const uidUSer = this.userData.uid;
    //coincidencia de user con extra
    const alumno = this.lista.find((list:any) => list.docenteId === uidUSer);
    if(alumno){
      this.lista = alumno;
    }
  });
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
        this.clases = claseSeleccionada;
      }
    });
  }

  //alerta
  async presentPopover() {
    const alert = await this.alertController.create({
      header: 'Lista de alumnos',
      message: `
      Alumno1: ${this.lista.alumno1}
      Alumno2: ${this.lista.alumno2}
    `,
      buttons: ['Listo']
    });
    return await alert.present();
  }
}
