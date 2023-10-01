import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController } from '@ionic/angular';



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
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
  }

  //crear funcion que logea
  async submit() {
    if (this.form.valid) {
      try {
        //constante que almacena lo ingresado en elform
        const { email, password } = this.form.value;
        await this.auth.signInWithEmailAndPassword(email, password);
        // Redirige al usuario después de iniciar sesión
        this.navCtrl.navigateRoot('/docente');
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
}

