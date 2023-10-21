import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // crear fromulario
  // form = new FormGroup({
  //   //los inputs
  //   email: new FormControl('',[Validators.required, Validators.email]),
  //   password: new FormControl('',[Validators.required]),
  // })


  constructor(private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private toastController: ToastController) { }


    //mensaje uwu
    async mostrarMensaje() {
      const toast = await this.toastController.create({
        message: 'Error, tu tipo de usuario no te permite ingresar a acá',
        duration: 3000, // Duración en milisegundos (en este caso, 3 segundos)
        position: 'bottom' // Puedes ajustar la posición del mensaje (top, bottom, middle)
      });

      toast.present();
    }

}
