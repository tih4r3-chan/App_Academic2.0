import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';




@Component({
  selector: 'app-cuenta-d',
  templateUrl: './cuenta-d.page.html',
  styleUrls: ['./cuenta-d.page.scss'],
})
export class CuentaDPage implements OnInit {

  constructor(
  ) {
  }

  ngOnInit() {
  }

  async leerUser(){
    try{
      const respuesta = await Preferences.get({key:'user'});
      if(respuesta.value){
        const usuario = JSON.parse(respuesta.value);
        const uid = usuario.uid;
      }
    }
    catch(error){
      console.log(error);
    }
  }

}
