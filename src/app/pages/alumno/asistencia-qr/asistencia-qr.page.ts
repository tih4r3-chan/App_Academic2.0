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

  asistenciaList: any[];

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
    //traer la asitencia
    this.apiService.getAsistencia().subscribe((data)=>{
      this.asistenciaList = data;
      //ordenar de  de mayor a menor
      this.asistenciaList.sort((a ,b) => b.hora.localeCompare(a.hora));
      //entrara a asistencia si hay datos
      if(this.asistenciaList.length > 0){
        //almaceno al usuario
        const uidUSer = this.userData.claseId;
        // coincidenia de clase id
        const coincidenciaClas = data.find((asistencia) => asistencia.claseId === uidUSer);
        //si se cumple esta coincidencia entra al if
        if(coincidenciaClas){
          //limite de tiempo, calcula la diferencia en minutos desde que se creo el documento
          const tiempoActual = new Date();//fecha actual
          const transTime = tiempoActual.toLocaleTimeString();// saco la hora actual
          const dataTime = coincidenciaClas.hora; //la hora de la creacion del documento
          //parsear, pasar de cadena de texto en horas y minutos
          const [transHoras, transMinutos] = transTime.split(':').map(Number);
          const [dataHoras, dataMinutos] = dataTime.split(':').map(Number);
          // Calcula la diferencia en minutos
          const diffTime = (transHoras * 60 + transMinutos) - (dataHoras * 60 + dataMinutos);
          if (diffTime < 40){
            const docId = coincidenciaClas.id; //id del documento a editar
            const idUser = this.userData.uid //id del usuario logeado
            //obtener datos de otra forma
            this.firestore.collection('asistencia').doc(docId).get().subscribe((doc)=>{
              //si el documento existe entra al if
              if(doc.exists){
                const asistenciaData = doc.data() as Asistencia; //asistencia es el model
                const listaA = asistenciaData.listaA; //traigo la listaa de la asistencia
                //ver si el usuario se encuentra en la lista y a cual alumno pertenece
                const foundUser1 = listaA[0].mapValue.fields.id; //id alumno 1
                const foundUser2 = listaA[1].mapValue.fields.id; //id alumno2
                //condicion de si el id de user se encuentra en aimno 1 o 2
                if(foundUser1 === idUser){
                  // const datoMod = listaA[0].mapValue.fields.asistio.booleanValue; //dato que quiero modificar
                  const datoMod = 'asistio'
                  const valorNew = true; //valor que le quiero dar
                  const dataUpdate = {};
                  dataUpdate[datoMod] = valorNew;
                  console.log(datoMod)

                  this.firestore.collection('asistencia').doc(docId).update({})
                }else if (foundUser2 === idUser){

                }else{
                  //mensaje
                  this.presentToast('El usuario no se encontro',4000);
                }
              }else{
                console.log('Documento Inexistente')
              }
            })
            //mensaje
            this.presentToast(`La clase comenzó hace ${diffTime} minutos`,4000);
          }else{
            //mensaje
            this.presentToast('La clase ya acabo :)',4000);
          }
        }else{
          //mensaje
          this.presentToast('No se inicio ninguna clase',2000);
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
