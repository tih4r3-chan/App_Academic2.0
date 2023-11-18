import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { claseModel } from 'src/app/models/clase';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-generador-asis',
  templateUrl: './generador-asis.page.html',
  styleUrls: ['./generador-asis.page.scss'],
})
export class GeneradorAsisPage implements OnInit {
  //inicializando lo que se uso en generador de QR
  texto: string = '';
  mensaje: string = '';


  userData: any;
  userList: any[];

  //inicializando
  clasess: any;

  //inicializando
  clases: claseModel[];


  constructor(
    private apiService: ApiService,
    private firestore: AngularFirestore,
    private toastController: ToastController
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
    }
  }

  //generador de QR
  generarTextoAleatorio() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const largo = 10;
    this.texto = Array.from({ length: largo }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');
    this.mensaje = 'Mostrar el codigo QR a los alumnos para que pueda ser escaneado'
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
            //guardar datos en preference
            await Preferences.set({
              key: 'asistencia',
              value: JSON.stringify(dataDoc),
            });
            //agregar el documento
            this.firestore.collection('asistencia').add(dataDoc);
            console.log('El documento ya se creo en firestore');
            //mensaje
            this.presentToast('Ya se inicio la asistencia, desde ahora los alumnos tiene 40 minutos para marcar su asistencia',4000);
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
