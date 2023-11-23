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


  async modificarAsistio() {
    // Traer la asistencia
    this.apiService.getAsistencia().subscribe((data) => {
      this.asistenciaList = data;
      // Ordenar de mayor a menor
      this.asistenciaList.sort((a, b) => b.hora.localeCompare(a.hora));
      // Entrará a asistencia si hay datos
      if (this.asistenciaList.length > 0) {
        const uidUser = this.userData.claseId;
        // Coincidencia de clase id
        const coincidenciaClas = data.find((asistencia) => asistencia.claseId === uidUser);
        // Si se cumple esta coincidencia, entra al if
        if (coincidenciaClas) {
          // Límite de tiempo, calcula la diferencia en minutos desde que se creó el documento
          const tiempoActual = new Date(); // Fecha actual
          const transTime = tiempoActual.toLocaleTimeString(); // Saco la hora actual
          const dataTime = coincidenciaClas.hora; // La hora de la creación del documento
          // Parsear, pasar de cadena de texto en horas y minutos
          const [transHoras, transMinutos] = transTime.split(':').map(Number);
          const [dataHoras, dataMinutos] = dataTime.split(':').map(Number);
          // Calcula la diferencia en minutos
          const diffTime = (transHoras * 60 + transMinutos) - (dataHoras * 60 + dataMinutos);
          if (diffTime < 40) {
            const docId = coincidenciaClas.id; // Id del documento a editar
            const idUser = this.userData.uid; // Id del usuario logeado
            // Obtener datos de otra forma
            this.firestore.collection('asistencia').doc(docId).get().subscribe((doc) => {
              // Si el documento existe, entra al if
              if (doc.exists) {
                const asistenciaData = doc.data() as Asistencia; // Asistencia es el modelo
                const listaA = asistenciaData.listaA; // Traigo la lista de la asistencia
                // Ver si el usuario se encuentra en la lista y a cuál alumno pertenece
                const findAlumnosIndex = listaA.findIndex(alumnos => alumnos.id.stringValue === idUser);
                if (findAlumnosIndex !== -1) {
                  // Crear constantes que almacenen lo que voy a cambiar
                  const alumnoToUpdate = listaA[findAlumnosIndex];
                  const newValue = true;
                  // Actualizar
                  alumnoToUpdate.asistio.booleanValue = newValue;
                  listaA[findAlumnosIndex] = alumnoToUpdate;
                  this.firestore.collection('asistencia').doc(docId).update({ listaA: listaA }).then(() => {
                    // Mensaje
                    this.presentToast('Ahora estás presente en la asistencia', 3000);
                    console.log('Documento actualizado con éxito');
                  }).catch(error => {
                    // Mensaje
                    this.presentToast('Error al actualizar la asistencia', 3000);
                    console.error('Error al actualizar la asistencia:', error);
                  });
                } else {
                  // Mensaje
                  this.presentToast('Llegaste tarde, ahora estás ausente', 4000);
                }
              } else {
                // Mensaje
                this.presentToast('Documento Inexistente', 3000);
              }
            });
            // Mensaje
            // this.presentToast2(`La clase comenzó hace ${diffTime} minutos`, 2300);
          } else {
            // Mensaje
            this.presentToast('La clase ya acabó :)', 2000);
          }
        } else {
          // Mensaje
          // this.presentToast('No se inició ninguna clase', 2000);
        }
      } else {
        // Mensaje
        this.presentToast('No hay datos de asistencia', 2000);
      }
    });
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
