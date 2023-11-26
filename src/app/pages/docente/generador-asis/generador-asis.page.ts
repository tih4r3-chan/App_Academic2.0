import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { claseModel } from 'src/app/models/clase';
import { ToastController } from '@ionic/angular';
// import { ServService } from '../serv.service';




@Component({
  selector: 'app-generador-asis',
  templateUrl: './generador-asis.page.html',
  styleUrls: ['./generador-asis.page.scss'],
})
export class GeneradorAsisPage implements OnInit {
  //inicializando lo que se uso en generador de QR
  texto: string;
  mensaje: string = '';


  userData: any;
  userList: any[];

  //inicializando
  clasess: any;
  class: claseModel[];

  //inicializando
  clases: claseModel[];


  constructor(
    private apiService: ApiService,
    private firestore: AngularFirestore,
    private toastController: ToastController,
    // private ServService:ServService
  ) { }

  ngOnInit() {
    this.mostrarData();
    this.leerUSer();

    //traer los datos de la clase
    this.apiService.getClases().subscribe((data: claseModel[]) => {
      // Aquí puedes acceder a los datos y hacer lo que necesites
      this.clases = data;
      //console.log(this.clases);
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
    }
  }

  //generador de QR
  generarTextoAleatorio() {
    this.mensaje = 'Mostrar el código QR a los alumnos para que pueda ser escaneado';
    // Traer los datos de la clase y almacenar información relacionada
    this.apiService.getClases().subscribe((data: claseModel[]) => {
      // Supongamos que quieres obtener información de la clase con ID this.userData.claseId
      const claseSeleccionada = data.find(clase => clase.uid === this.userData.claseId);
      // Verificar si se encontró la clase
      if (claseSeleccionada) {
        this.texto = 'Nombre:\n' + claseSeleccionada.nombre +
        '\n'+ 'Sección:\n'+claseSeleccionada.seccionId;
      }
  });
  }

  //metodo que crea el documento
  async crearDocumento(){
    if(this.userData){
    //llama lo generar el qr
      this.generarTextoAleatorio();
      //obtener clase id del user almacenado
      const claseId = this.userData.claseId;
      if(claseId && this.clases){
        //encontrar la clase que coincide
        const claseselccionada = this.clases.find((clase) => clase.uid === claseId);
          if(claseselccionada){
            //traer la lista completa de la clase
            const listaA = claseselccionada.listaA;
            //agregar campos de fecha y hora
            const fechaActual = new Date();
            // trae la fecha en formato YYYY-MM-DD
            const fecha = fechaActual.toISOString().split('T')[0];
            //traer el dia en palabras
            const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const nombreDia = diasSemana[fechaActual.getDay()];
            //traer hora en formato HH:mm:ss
            const hora = fechaActual.toLocaleTimeString();
            //armar el documento
            const dataDoc = {
              nombreDocente: this.userData.nombre +" "+this.userData.apellido,
              claseId: claseId,
              listaA: listaA,
              fecha: fecha,
              hora: hora,
              dia: nombreDia
            };
            // console.log(dataDoc)
            //guardar datos en preference
            await Preferences.set({
              key: 'asistencia',
              value: JSON.stringify(dataDoc),
            });
            //agregar el documento, agregar filtro
            this.firestore.collection('asistencia').add(dataDoc);
            console.log('El documento ya se creo en firestore');
            //mensaje
            this.presentToast('Ya se inicio la asistencia, desde ahora los alumnos tiene 40 minutos para marcar su asistencia',4000);
            // Cambiar el estado de la clase a true en Firestore
            const docId = claseselccionada.uid;
            await this.firestore.collection('clase').doc(docId).update({
              estado: true
            });

            // Mensaje
            this.presentToast('Ya se inició la asistencia, desde ahora los alumnos tienen 40 minutos para marcar su asistencia', 4000);

            // Esperar 60 minutos y luego cambiar el estado a false
            setTimeout(async () => {
              // Cambiar el estado de la clase a false después de 60 minutos en Firestore
              await this.firestore.collection('clase').doc(docId).update({
                estado: false
              });
              console.log('El estado de la clase ha vuelto a false después de 60 minutos');
            }, 60 * 60 * 1000);
          }
      }
    }
  }
  //mensaje
  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration, // Duración en milisegundos (en este caso, 4000 ms = 4 segundos)
      position: 'top' // Posición del mensaje (puedes ajustarla según tus preferencias)
    });
    toast.present();
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
