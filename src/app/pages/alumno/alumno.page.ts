import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/firestore.service';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  userData: any;
  users: any;
  userList: any[];


  //variable que almacena los datos del ususaio
  user: any;

  constructor(
    public authService : AuthenticationService,
    private service: ApiService) { }

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
    }
  }

  async cerraSesion(){
    await this.authService.SignOut();
  }
}
