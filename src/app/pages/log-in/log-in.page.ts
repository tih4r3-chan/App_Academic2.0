import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { User } from 'src/app/models/user.model'
import { UserLog } from 'src/app/models/UserLog';



@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  listaUser: any;
  // crear fromulario
  form = new FormGroup({
    //los inputs
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  public email: string;
  public password: string;

  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
  }

  ngOnInit() {
  }

  //crear funcion que logea
  async submit() {

    //mostrara el simbolo de cargando
    const loading = await this.loadingController.create({
      message: 'Iniciando Sesión', // Mensaje que se mostrará junto al spinner
      duration: 2000, // Duración máxima en milisegundos (5 segundos)
      translucent: true, // Hace que el fondo sea translúcido
      backdropDismiss: false, // Evita que el usuario cierre la carga tocando fuera de ella
    });
    await loading.present();

    if (this.form.valid) {
      try {
        const {email, password} = this.form.value;
        await this.afAuth.signInWithEmailAndPassword(email,password);
        //obtener datos del user autenticado
        const user = await this.afAuth.currentUser;

        //hacer consulta para obtener datos del usuario
        if(user){
          //guardar datos en preference
          await Preferences.set({
            key: 'user',
            value: JSON.stringify(user),
          });

          const userId = user.uid;
          // obtener datos del usuario de la base de datos
          const userDocRef = this.firestore.collection('usuarios').doc(userId);
          const userDocSnap: Observable<any> = userDocRef.valueChanges();

          // suscribirse
          userDocSnap.subscribe((userData) =>{
            // Verificar si el documento existe
            if(userData){
              //obtener tipo de user
              const userType = userData.tipo;

              //condiciional para que se verifique es admini
              if(userType === 'alumno'){
                // Redirige al usuario después de iniciar sesión
                this.navCtrl.navigateRoot('/alumno');
              }else if(userType === 'docente'){
                // Redirige al usuario después de iniciar sesión
                this.navCtrl.navigateRoot('/docente');
                //enviar a la vista docente el id del profe o guardar en localstorage(preference)
              }else{
                console.log('No tienes permiso de entrar');
                this.presentToast('No tiene el permiso para ingresar acá');
              }
            }else{
              console.log('Entro al otro N|2');
            }
          });
        }
        await loading.dismiss();
      } catch (error) {
        console.log('Error al inisiar sesión: ',error)
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Credeciales invalidas, Intentelo denuevo:)',
          buttons: ['ACEPTAR']
        });
        await alert.present();
      }
    }
  }

  //mensaje de error
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500, // Duración en milisegundos (2 segundos)
      position: 'top' // Posición en el centro de la pantalla
    });
    toast.present();
  }
}

