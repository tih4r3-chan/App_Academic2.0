import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.page.html',
  styleUrls: ['./admin-log.page.scss'],
})
export class AdminLogPage implements OnInit {

  // crear fromulario
  form = new FormGroup({
    //los inputs
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })


  constructor(private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  //crear funcion que logea
  async login() {
    if (this.form.valid) {
      try {
        const { email, password } = this.form.value;
        await this.afAuth.signInWithEmailAndPassword(email, password);
        // Redirige al usuario después de iniciar sesión
        this.navCtrl.navigateRoot('/admin');
      } catch (error) {
        console.log('Error de Inicio de Sesión: ', error);
      }
    }
  }

}
