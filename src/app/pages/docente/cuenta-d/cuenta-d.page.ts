import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';




@Component({
  selector: 'app-cuenta-d',
  templateUrl: './cuenta-d.page.html',
  styleUrls: ['./cuenta-d.page.scss'],
})
export class CuentaDPage implements OnInit {
  userData: any;
  users: any;
  userList: any[];

  constructor(
    private service: ApiService
    ) {
  }

  ngOnInit() {
    this.leerUSer();

    //obtener lista de user de la pai
    this.service.getUsers().subscribe((data) => {
      this.userList =data;

      //compara el uid estraido con el amacenado
      this.userList.forEach((user)=>{
        //este es uid almacenado en capacitor
        const uid = user.uid;
        if(this.userData && this.userData.uid === uid){
          this.userData = user;
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
}
