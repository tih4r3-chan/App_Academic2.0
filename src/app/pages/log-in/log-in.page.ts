import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,DocumentSnapshot } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  // crear fromulario
  form = new FormGroup({
    //los inputs
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })

  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) {}

  ngOnInit() {
  }

  //crear funcion que logea
  async submit(){
    //validar si el formulario es valido
    if(this.form.valid) {
      //try catch para asi atrapar errores
      try{
        //constante que guarda lo que se ingreso en el input
        const {email , password} = this.form.value;
        //autenticar si lo que se ingreso esta almacenado en la bd, await = asincronico
        await this.afAuth.signInWithEmailAndPassword(email, password);

        // Obtener el tipo de usuario desde Firestore
        const userDoc = this.firestore.collection('usuarios').doc(email);

        //
        userDoc.get().subscribe((docSnapshot: DocumentSnapshot <any>) => {
          if (docSnapshot.exists) {
            const userData = docSnapshot.data();
            const tipoUsuario = userData.tipo;

            // Redirigir según el tipo de usuario
            if (tipoUsuario === 'docente') {
              this.navCtrl.navigateRoot('/docente');
            } else if (tipoUsuario === 'alumno') {
              this.navCtrl.navigateRoot('/alumno');
            } else {
              // Tipo de usuario no reconocido, puedes mostrar un mensaje de error.
              console.log('Tipo de usuario no válido');
            }
          } else {
            // El usuario no existe en Firestore, puedes mostrar un mensaje de error.
            console.log('Usuario no encontrado en Firestore');
          }
        })
      }
      catch(error){
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

}

