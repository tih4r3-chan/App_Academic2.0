import { Injectable, NgZone } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

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
    private activatedRoute: ActivatedRoute
  ) {
  }
  // 1metodo para registrar nuevos correo en el Auth
  RegisterUser(email: any, password: any) {
    //se crea una instancia de AngualrFireAuth y luego se registra un nuevo correo
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Cerrar sesion uwu
  async SignOut() {
    try {
      // Cerrar sesión
      await this.ngFireAuth.signOut();
      console.log('Sesión cerrada');

      // Eliminar datos del preference
      await Preferences.remove({ key: 'user' });
      console.log('Datos de usuario eliminados');

      // Redireccionamiento
      this.router.navigate(['/home'], { replaceUrl: true });

      // Mensaje
      this.presentToast('Sesión cerrada con éxito', 3000);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
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
