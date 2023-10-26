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
  users: any;
  userList: any[];

  //inicializando
  firestoreData: any[];
  clases: any;


  constructor(
    private apiService: ApiService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.leerUSer();

    //obtener lista de user de la pai
    this.apiService.getUsers().subscribe((data) => {
      this.userList =data;

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

  //traer datos de la api
  async traerClase(){
    this.apiService.getClases().subscribe((data: claseModel[]) => {
      // Aquí puedes acceder a los datos y hacer lo que necesites
      this.clases = data;
    });
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

  async crearDocumento(){
    if(this.userData){
      //obtener clase id del user almacenado
      const claseId = this.userData.claseId;
      if(claseId){
          console.log(this.clases)
          //armar el documento
          const dataDoc = {
            nombreDocente: this.userData.nombre,
            claseId: claseId,
            ListaA:{
              alumno1:{
                id: 'alumno1',
                asistio: false
              },
              alumno2:{
                id: 'alumno2',
                asistio: false
              }
            }
          };
          //agregar el documento
          this.firestore.collection('asistencia').add(dataDoc);
          console.log('El documento ya se creo en firestore');
      }
    }
  }
}
