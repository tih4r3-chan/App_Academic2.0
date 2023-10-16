import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore } from "@angular/fire/firestore";
import { Observable, map } from "rxjs";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url de la api
  urlApiU ='https://firestore.googleapis.com/v1/projects/AIzaSyCXa-yIkcrkRSASC-HoxtHaITXpLe43SGI/databases/(default)/documents/usuarios';

  constructor(
    private http: HttpClient,
    private firestore: Firestore
  ) { }

  //traer usuario
  getUsers(){
    return this.http.get(`${this.urlApiU}/usuarios.json`)
  }

  //crar usuarios
  crearUser(nuevoUsuario: any) {
    return this.http.post(`${this.urlApiU}/usuarios.json`, nuevoUsuario);
  }

  //actualizar usuario
  actualizarUser(userId: string, datosAct: any){
    return this.http.put(`${this.urlApiU}/usuarios/${userId}.json`,datosAct)
  }

  //eliminar usuario
  eliminarUser(userId: string){
    return this.http.delete(`${this.urlApiU}/usuarios/${userId}.json`)
  }
}
