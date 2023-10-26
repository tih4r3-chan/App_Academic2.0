import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
// import { Firestore } from "@angular/fire/firestore";
import { Observable, map } from "rxjs";
import { User } from '../models/user.model';
import { claseModel } from '../models/clase';

import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url de la api, trae los usuarios
  urlApi = 'https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents';
  urlApiU ='https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents/usuarios';
  urlApiC = 'https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents/clase';

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }
//-------------------- Seccion usuarios ----------------------------//

  //traer usuario
  getUsers(){
    return this.http.get<any>(this.urlApiU).pipe(
      map((data) => {
        // console.log(data);
        let listaU: User[] = [];
        data.documents.map((elementos: any) =>{
          //acceder al id, extrallendolo del path
          const path = elementos.name
          const partes = path.split('/');
          const usid = partes[partes.length - 1];
          // console.log(usid,'probando que sea el id uwu');
          const usuarios: User = {
            uid: usid,
            apellido: elementos.fields.apellido.stringValue,
            claseId: elementos.fields.claseId.stringValue,
            direccion: elementos.fields.direccion.stringValue,
            dv: elementos.fields.dv.integerValue,
            email: elementos.fields.email.stringValue,
            nombre:elementos.fields.nombre.stringValue,
            password: elementos.fields.password.stringValue,
            phone: elementos.fields.phone.integerValue,
            rut: elementos.fields.rut.integerValue,
            tipo: elementos.fields.tipo.stringValue
          }
          listaU.push(usuarios)
        })
        return listaU;
      })
    )
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
//-------------------- Fin seccion usuarios ----------------------------//

//-------------------- Seccion clase ----------------------------//
  //traer clases --> metodo get

  getClases(){
    return this.http.get<any>(this.urlApiC).pipe(
      map( (data) =>{
        // console.log(data)
        let List: claseModel[] = [];
        data.documents.map( (element:any) => {
          // Acceder al ID del documento, extrallendolo del path completo
          const fulpath = element.name
          const parts = fulpath.split('/');
          const uid = parts[parts.length - 1];
          // console.log(uid,'probando que sea el id uwu');
          // console.log(element)
            const clase: claseModel = {
                uid: uid,
                codigo: element.fields.codigo.stringValue,
                docenteId: element.fields.docenteId.stringValue,
                nombre: element.fields.nombre.stringValue,
                sala: element.fields.sala.stringValue,
                seccionId: element.fields.seccionId.integerValue,
                listaA: element.fields.listaA.mapValue.fields
            }
            List.push(clase);
        });
        return List;
    })
    );
  }

//-------------------- Fin seccion clase ----------------------------//

//-------------------- Seccion asistencia ----------------------------//

//-------------------- Fin seccion asistencia ----------------------------//
}
