import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { Preferences } from '@capacitor/preferences';



@Component({
  selector: 'app-cuenta-d',
  templateUrl: './cuenta-d.page.html',
  styleUrls: ['./cuenta-d.page.scss'],
})
export class CuentaDPage implements OnInit {
  //preference de capacitor
  user: any = {};

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadUserData();
  }

  //cargar los datos de usuarios desde el prreference
  async loadUserData(){
    const respuesta = await Preferences.get({ key: 'dataUser'});
    if(respuesta.value){
      this.user = JSON.parse(respuesta.value);
    }
  }

}
