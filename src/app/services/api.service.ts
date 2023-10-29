import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Firestore } from "@angular/fire/firestore";
import {  map } from "rxjs";
import { User } from '../models/user.model';
import { claseModel } from '../models/clase';
import { Asistencia } from 'src/app/models/asistencia';
import { Lista } from 'src/app/models/eextra';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url de la api, trae los usuarios
  urlApi = 'https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents';
  urlApiU ='https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents/usuarios';
  urlApiC = 'https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents/clase';
  urlApiA = 'https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents/asistencia';
  urlApiL = 'https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents/lista';

  constructor(
    private http: HttpClient
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
            dv: elementos.fields.dv.stringValue,
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
                nombreD: element.fields.nombreD.stringValue,
                listaA: element.fields.listaA.arrayValue.values
            }
            List.push(clase);
        });
        return List;
    })
    );
  }

//-------------------- Fin seccion clase ----------------------------//

//-------------------- Seccion asistencia ----------------------------//
//traer Asistencia --> metodo get
getAsistencia(){
  return this.http.get<any>(this.urlApiA).pipe(
    map( (data) =>{
      // console.log(data)
      let Lista: Asistencia[] = [];
      data.documents.map( (element:any) => {
        // Acceder al ID del documento, extrallendolo del path completo
        const fulpath = element.name
        const parts = fulpath.split('/');
        const id = parts[parts.length - 1];
          const asistencia: Asistencia = {
            id: id,
            dia: element.fields.dia.stringValue,
            listaA: element.fields.listaA.arrayValue,
            claseId: element.fields.claseId.stringValue,
            nombreDocente: element.fields.nombreDocente.stringValue,
            fecha: element.fields.fecha.stringValue,
            hora: element.fields.hora.stringValue
          }
          Lista.push(asistencia);
      });
      return Lista;
    })
  );
}
//-------------------- Fin seccion asistencia ----------------------------//
//-------------------- Inicio seccion extra ----------------------------//
getExtra(){
  return this.http.get<any>(this.urlApiL).pipe(
    map( (data) =>{
      let list: Lista[] = [];
      data.documents.map((elementos:any)=>{
        // Acceder al ID del documento, extrallendolo del path completo
        const fulpath = elementos.name
        const parts = fulpath.split('/');
        const id = parts[parts.length - 1];
        const listaAl: Lista ={
          id: id,
          docenteId: elementos.fields.docenteId.stringValue,
          nombre: elementos.fields.nombre.stringValue,
          alumno1: elementos.fields.alumno1.stringValue,
          alumno2: elementos.fields.alumno2.stringValue
        }
        list.push(listaAl);
      });
      return list;
    })
  );
}
//-------------------- Finseccion extra ----------------------------//
}
