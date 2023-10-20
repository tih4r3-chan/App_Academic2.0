import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Firestore } from "@angular/fire/firestore";
import { Observable, map } from "rxjs";
// import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url de la api, trae los usuarios
  urlApiU ='https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents/usuarios';
  urlApiC = 'https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents/clase';

  constructor(
    private http: HttpClient,
    // private firestore: Firestore
  ) { }
//-------------------- Seccion usuarios ----------------------------//
  //traer usuario
  getUsers(): Observable<any>{
    console.log('entro a la funcion getUSer')
    return this.http.get<any>(this.urlApiU).pipe(
      map((data) => {
        console.log(data);
        const listaU = data.documents.map((elementos: any) =>{
          const usuarios = {
            apellidos: elementos.fields.apellidos.stringValue,
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
  getClases():Observable<any> {
    return this.http.get<any>(this.urlApiC);
  }

  //mostrar las clases
  mostrarClases(claseId: string):Observable<any> {
    const url = `${this.urlApiC}/clase/${claseId}`;
    return this.http.get<any>(url);
  }
//-------------------- Fin seccion clase ----------------------------//

//-------------------- Seccion asistencia ----------------------------//

//-------------------- Fin seccion asistencia ----------------------------//
}
