import { Injectable, NgZone } from '@angular/core'
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './capacitor.service';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  //api

    //inicializar UserData cono any
  userData: any;

  //preference de capacitor
  // dataUser: any = {};

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private toastController: ToastController,
    private storage: AuthServiceService
  ) {
  }
  // 1metodo para registrar nuevos correo en el Auth
  RegisterUser(email: any, password: any) {
    //se crea una instancia de AngualrFireAuth y luego se registra un nuevo correo
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Cerrar sesion uwu
  async SignOut() {
    try{
      //cerra sesion
      await this.ngFireAuth.signOut();
      //redireccionamiento
      this.router.navigate(['/home']),
      await Preferences.remove({key: 'user'});
      //mensaje
      this.presentToast('Sesión cerrada con exito',3000);

    }
    catch(error){
      console.log(error);
    }
  }

  //mensaje de error
  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration, // Duración en milisegundos (en este caso, 4000 ms = 4 segundos)
      position: 'bottom' // Posición del mensaje (puedes ajustarla según tus preferencias)
    });
    toast.present();
  }
}
