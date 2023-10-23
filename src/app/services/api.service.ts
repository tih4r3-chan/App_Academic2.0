import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
// import { Firestore } from "@angular/fire/firestore";
import { Observable, map } from "rxjs";
// import { User } from '../models/user.model';
import { claseModel } from '../models/clase';


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

  getClases(){
    return this.http.get<any>(this.urlApiC).pipe(
      map( (data) =>{
        // console.log(data)
        let List: claseModel[] = [];
        data.documents.map( (element:any) => {
          // console.log(element)
            const clase: claseModel = {
                uid: element.documents,
                codigo: element.fields.codigo.stringValue,
                docenteId: element.fields.docenteId.stringValue,
                nombre: element.fields.nombre.stringValue,
                sala: element.fields.sala.stringValue,
                seccionId: element.fields.seccionId.stringValue,
                listaA: element.fields.listaA.mapValue.fields
            }
            List.push(clase);
        });
        return List;
    })
    );
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
        // obtener datos del usuario de la base de datos
        const userDocRef = this.firestore.collection('usuarios').doc(userId);
        const userDocSnap: Observable<any> = userDocRef.valueChanges();

        // suscribirse
        userDocSnap.subscribe((userData) =>{
          // Verificar si el documento existe
          if(userData){
            //obtener el id de la clase segun el user logeado
            const userClass = userData.claseId;
            //obtener id  de la clase
            this.getClases().subscribe((claseId) =>{
              const clase = claseId
              if(userClass === clase){
                console.log(clase)
              }

            })
          }else{
            console.log('Entro al otro N|2');
          }
        });

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
