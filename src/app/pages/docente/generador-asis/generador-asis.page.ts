// import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { claseModel } from 'src/app/models/clase';



@Component({
  selector: 'app-generador-asis',
  templateUrl: './generador-asis.page.html',
  styleUrls: ['./generador-asis.page.scss'],
})
export class GeneradorAsisPage implements OnInit {
  userData: any;
  userList: any[];

  //inicializando
  clasess: any;

  //inicializando
  clases: claseModel[];


  constructor(
    private apiService: ApiService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.mostrarData();
    this.leerUSer();

    //traer los datos de la clase
    this.apiService.getClases().subscribe((data: claseModel[]) => {
      // Aquí puedes acceder a los datos y hacer lo que necesites
      this.clases = data;
      // console.log(this.clases);
    });

    //obtener lista de user de la api
    this.apiService.getUsers().subscribe((data) => {
      this.userList = data;
      //compara el uid extraido con el amacenado
      this.userList.forEach((user)=>{
        //este es uid almacenado en capacitor
        const uid = user.uid;
        if(this.userData && this.userData.uid === uid){
          this.userData = user;
        }
      })
    })
  }

  //trae los datos del capcitor que estsan almacenados
  async leerUSer(){
    const response  = await Preferences.get({key:'user'});
    if(response.value){
      this.userData = JSON.parse(response.value);
      //me trae el id del usuario
      const idUser = this.userData.uid;
      // console.log(idUser);
    }
  }

  //metodo que crea el documento
  async crearDocumento(){
    if(this.userData){
      //obtener clase id del user almacenado
      const claseId = this.userData.claseId;
      if(claseId && this.clases){
        //encontrar la clase que coincide
        const claseselccionada = this.clases.find((clase) => clase.uid === claseId);
          if(claseselccionada){
            //traer los alumnos
            const listaA = claseselccionada.listaA;
            //armar el documento
            const dataDoc = {
              nombreDocente: this.userData.nombre,
              claseId: claseId,
              listaA: listaA
            };
            //guardar datos en preference
            await Preferences.set({
              key: 'asistencia',
              value: JSON.stringify(dataDoc),
            });
            //agregar el documento
            this.firestore.collection('asistencia').add(dataDoc);
            console.log('El documento ya se creo en firestore');
          }
      }
    }
  }

  async mostrarData(){

    //traigo el user almacenado
    const response  = await Preferences.get({key:'user'});
    if(response.value){
      this.userData = JSON.parse(response.value);
    }

    //obtener lista de user de la api
    this.apiService.getUsers().subscribe((data) => {
      this.userList = data;
      //compara el uid extraido con el amacenado
      const usuarioEncontrado = this.userList.find((user) => user.uid === this.userData.uid);
      if(usuarioEncontrado){
        this.userData = usuarioEncontrado;
        // console.log(usuarioEncontrado);
      }
    })

    //traer los datos de la clase
    this.apiService.getClases().subscribe((data) => {
      this.clases = data;
      // console.log(this.clases);

      //almacenar el usuario, el uid
      const uidUSer = this.userData.claseId;
      // console.log(uidUSer);

      //concidencia con la clase
      const claseSeleccionada = this.clases.find((clase)=> clase.uid === uidUSer);
      if(claseSeleccionada){
        this.clasess = claseSeleccionada;
        // console.log(this.clasess,'clase seleccionada');
      }
    });
  }
}
