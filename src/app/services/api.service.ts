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
  urlApi ='https://firestore.googleapis.com/v1/projects/AIzaSyCXa-yIkcrkRSASC-HoxtHaITXpLe43SGI/databases/(default)/documents/usuarios';

  constructor(
    private http: HttpClient,
    private firestore: Firestore
  ) { }

    // obtener usuario
    // getUser(): Observable<User[]>{
    //   return this.http.get<any>('https://firestore.googleapis.com/v1/projects/AIzaSyCXa-yIkcrkRSASC-HoxtHaITXpLe43SGI/databases/(default)/documents/usuarios');
    //   map((datos) => {
    //     console.log(datos)
    //     let listaUser: User[] = [];
    //     datos.documents.map((elemento : any) => {
    //       const usuario: User = {
    //         userId: elemento.name.split('/').pop(),
    //         apellido: elemento.fields.apellido.stringValue,
    //         direccion: elemento.fields.direccion.stringValue,
    //         dv: elemento.fields.dv.integerValue,
    //         email: elemento.fields.email.stringValue,
    //         nombre: elemento.fields.nombre.stringValue,
    //         password: elemento.fields.password.stringValue,
    //         phone:elemento.fields.phone.integerValue,
    //         rut: elemento.fields.rut.integerValue,
    //         tipo: elemento.fields.tipo.stringValue,
    //         // claseId: elemento.fields.claseId.stringValue
    //       }
    //       listaUser.push(usuario);
    //     });
    //     return listaUser;
    //   })
    // }

}
