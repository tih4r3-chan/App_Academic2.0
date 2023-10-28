import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { Asistencia } from 'src/app/models/asistencia';
import { claseModel } from 'src/app/models/clase';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-asistencia-qr',
  templateUrl: './asistencia-qr.page.html',
  styleUrls: ['./asistencia-qr.page.scss'],
})
export class AsistenciaQrPage implements OnInit {
  userData: any;
  userList: any[];

  asisData: any;

  //inicializando
  clases: claseModel[];

  asistenciaList: any;

  //inicializando
  clasess: any;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.mostrarData();
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
      const claseSeleccionada = this.clases.find((clase: any)=>clase.uid === uidUSer);
      if(claseSeleccionada){
        this.clasess = claseSeleccionada;
      }
    });
  }

  async modificarAsistio(){
    // traer la asistencia
    this.apiService.getAsistencia().subscribe((data) => {
      //ordenar datos de forma decendente, de mayor a menor(la fecha)
      data.sort((a,b) => b.hora.localeCompare(a.hora));
      //condicion--> para ver si la asistencia tiene al meno un elemento(un documento)
      if(data.length > 0){
        //bucle , para que recorra toda la lista array de la asistencia
        for(let i = 1; i < data.length; i++){
          //almacenar el usuario, el uid
          const uidUSer = this.userData.claseId;
          //coincidencia de claseId
          const coincidencia = data.find((asistencia) => asistencia.claseId === uidUSer);
          //condicion --> si el claseId de la asistencia es igual al claseId que tiene el usuario puede seguir xD
          if(coincidencia){
            this.asistenciaList = coincidencia;
            //limite de tiempo, calcula la diferencia en minutos desde que se creo el documento
            const tiempoActual = new Date();//fecha actual
            const transTime = tiempoActual.toLocaleTimeString();// saco la hora actual
            const dataTime = coincidencia.hora; //la hora de la creacion del documento
            //parsear, pasar de cadena de texto en horas y minutos
            const [transHoras, transMinutos] = transTime.split(':').map(Number);
            const [dataHoras, dataMinutos] = dataTime.split(':').map(Number);
            // Calcula la diferencia en minutos
            const diffTime = (transHoras * 60 + transMinutos) - (dataHoras * 60 + dataMinutos);
            //condicion para que cuando la resta sea mayor a 40 no se pueda modificar
            if(diffTime < 40){
              console.log(diffTime);
              //agregar el metodo parapoder modificar el asistio
              //almacenar el usuario, el uid
              const userId = this.userData.id;
              // const coincideAl = coincidencia.listaA
              // const coincideAl = data.find((datos: any)=> datos.listaA.alumno1 === userId ? 'alumno1' : 'alumno2')
              // if(coincideAl){
              //   const docId = coincidencia.id;//id de la sistencia a modificar
              //   //dato pa actualizar
              //   const updateAsis = {
              //     [`listaA.${coincideAl}.asistio`]: true
              //   };
              //   this.firestore.collection('asistencia').doc(docId).update(updateAsis);
              //   this.presentToast('Ya esta presente en la lista',4000);
              // }else{
              //   //mensaje
              //   this.presentToast('No estas en la lista de alumnos',4000);
              // }
            }else{
              //mensaje
              this.presentToast('La clase ya acabo :)',4000);
            }
          }else{
            //mensaje
            this.presentToast('No se inicio ninguna clase',2000);
          }
        }
      }else{
        //mensaje
        this.presentToast('No hay datos de asistencia',2000);
      }
    })
  }

  //mensaje de error
  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration, // Duración en milisegundos (en este caso, 4000 ms = 4 segundos)
      position: 'middle' // Posición del mensaje (puedes ajustarla según tus preferencias)
    });
    toast.present();
  }
}
