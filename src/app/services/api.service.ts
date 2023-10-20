import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
// import { Firestore } from "@angular/fire/firestore";
import { Observable, map } from "rxjs";
// import { User } from '../models/user.model';


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
    private route: ActivatedRoute
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
    return this.http.get<any>(this.urlApiC).pipe(
      map((data) => {
        if(data && data.documents){
          console.log(data.documents,'esto esta en la api');
          const listaC = data.documents.map((elements:any) => {
            if(elements.fields){
              const clases = {
                codigo: elements.fields.codigo?.stringValue || ' ',
                nombre: elements.fields.nombre?.stringValue || ' ',
                sala: elements.fields.sala?.stringValue || ' ',
                seccionId: elements.fields.seccionId?.integerValue || ' ',
                docenteId: elements.fields.docenteId?.stringValue || ' ',
                listaA: {
                  alumno1: elements.mapValue.fields.alumno1?.stringValue || ' ',
                  alumno2: elements.mapValue.fields.alumno2?.stringValue || ' '
                }
              }
              listaC.push(clases);
            }
          });
          return listaC;
        }else{
          console.error('La respuesta de la API no contiene documentos válidos');
          return [];
        }
      })
    )
  }


  //crear documento en firestore
  async crearDoc(){
    //verificar si el user esta autenticado
    const user = await this.afAuth.currentUser;
    console.log('El usuario si esta autenticado')
    try{
      if (user) {
        //traigo el id del user
        const userId = user.uid;
        // this.mostrarClases(claseId).subscribe(data => {
        //   console.log('Lista de clases: ',data);
        // })

        //el usuario que se logeo debe ser igual al uid para crear un doc de asistencia
        // ya que si no est su codigo aca no imparte clases
        if(userId){

        }else{
          console.log('El usuario no imparte esta clase :)')
        }
      }else{
        console.log('El user no esta autenticado :)')
      }
    }
    catch(error){
      console.log('Error del primer try -->', error);
    }
  };
//-------------------- Fin seccion clase ----------------------------//

//-------------------- Seccion asistencia ----------------------------//

//-------------------- Fin seccion asistencia ----------------------------//
}
