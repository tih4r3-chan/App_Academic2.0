import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { Asistencia } from 'src/app/models/asistencia';

@Component({
  selector: 'app-asistencia-qr',
  templateUrl: './asistencia-qr.page.html',
  styleUrls: ['./asistencia-qr.page.scss'],
})
export class AsistenciaQrPage implements OnInit {
  userData: any;
  userList: any[];

  aistencia: Asistencia[];

  constructor(
    private apiService: ApiService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.leerUSer();

    //traer los datos de la clase
    this.apiService.getAsistencia().subscribe((data: Asistencia[]) => {
      // Aquí puedes acceder a los datos y hacer lo que necesites
      this.aistencia = data;
      console.log(this.aistencia);
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
      //obtener clase id del user almacenado
      const claseId = this.userData.claseId;
    }
  }

}
