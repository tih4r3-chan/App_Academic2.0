import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { Asistencia } from 'src/app/models/asistencia';
import { claseModel } from 'src/app/models/clase';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-asistencia-qr',
  templateUrl: './asistencia-qr.page.html',
  styleUrls: ['./asistencia-qr.page.scss'],
})
export class AsistenciaQrPage implements OnInit {
  userData: any;
  userList: any[];

  //inicializando
  clases: claseModel[];

  asistenciaList: any[];

  //inicializando
  clasess: any;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit() {
    this.mostrarData();
    // Suscríbete al resultado del escáner
    this.sharedDataService.currentResult.subscribe((result) => {
      console.log('Resultado del escáner en AsistenciaQrPage:', result);
      this.modificarAsistio();
    });
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
        // for(let i = 0; i < this.asistenciaList.length; i++) {
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
                  const findAlumnos = listaA.find(alumnos => alumnos.mapValue.fields.id.stringValue === idUser);//trae al alumno que coincida
                  if(findAlumnos){
                    //crear constantes que allamcenen lko que voy a cambiar
                    const alumnoToUpdate  = findAlumnos;
                    const newValue = true;
                    //actualizar
                    alumnoToUpdate.mapValue.fields.asistio.booleanValue = newValue;
                    this.firestore.collection('asistencia').doc(docId).update({ listaA: listaA }).then(() => {
                      //mensaje
                      this.presentToast('Ahora estas precente en la asistencia',3000);
                      console.log('Documento actualizado con éxito');
                    })
                    .catch(error => {
                      //mensaje
                      this.presentToast('Error al actualizar la asistencia',3000);
                      console.error('Error al actualizar la asistencia:', error);
                    });
                  }else{
                    //mensaje
                    this.presentToast('Llegaste tarde, ahora estas ausente',4000);
                  }
                }else{
                  //mensaje
                  this.presentToast('Documento Inexistente',3000);
                }
              })
              //mensaje
              this.presentToast2(`La clase comenzó hace ${diffTime} minutos`,2300);
            }else{
              //mensaje
              this.presentToast('La clase ya acabo :)',2000);
            }
          }else{
            //mensaje
            // this.presentToast('No se inicio ninguna clase',2000);
          }
        // }
      }else{
        //mensaje
        this.presentToast('No hay datos de asistencia',2000);
      }
    })
  }

  //mensaje
  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration, // Duración en milisegundos (en este caso, 4000 ms = 4 segundos)
      position: 'middle' // Posición del mensaje (puedes ajustarla según tus preferencias)
    });
    toast.present();
  }
  async presentToast2(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration, // Duración en milisegundos (en este caso, 4000 ms = 4 segundos)
      position: 'bottom' // Posición del mensaje (puedes ajustarla según tus preferencias)
    });
    toast.present();
  }
}
