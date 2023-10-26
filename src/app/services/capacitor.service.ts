import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor() { }

  //guarda al usuario
  async crearUser(key: string,value: string){
    await Preferences.set({key,value});
  }
  //leer al user
  async leerUSer(key: string){
    return (await Preferences.get({key}));
  }
  //actualizar al user
  async actualizarUSer(key: string,value: string){
    await Preferences.set({key, value});
  }
  //eliminar usuario
  async eliminarUser(key: string){
    await Preferences.remove({key});
  }
  //eliminar user del almacenamiento
  async limpiar(){
    await Preferences.clear();
  }

}
