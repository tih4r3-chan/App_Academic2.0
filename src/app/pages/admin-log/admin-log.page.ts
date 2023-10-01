import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of, switchMap } from 'rxjs';


@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.page.html',
  styleUrls: ['./admin-log.page.scss'],
})
export class AdminLogPage implements OnInit {

  /// crear fromulario
  form = new FormGroup({
    //los inputs
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })


  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private ngFireStore: AngularFirestore,
    private router: Router) {

      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      })
    }

  ngOnInit() {
  }

  //crear funcion que logea
  async login() {
    if (this.form.valid) {
      try {
        const { email, password } = this.form.value;
        const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);

        //obtener el uid del user
        const uid = userCredential.user.uid;

        //consulta a Firestore para obtener los datos del usuario
        const userDoc = this.ngFireStore
        .doc('usuarios/${uid}')
        .snapshotChanges()
        .pipe(
          switchMap((doc) => {
            const userData = doc.payload.data() as any;
            return of(userData);
          })
        );

        userDoc.subscribe((userData) => {
          if(userData && userData.tipo === 'alumno'){
            this.navCtrl.navigateRoot('/alumno')
          }else if(userData && userData.tipo === 'docente'){
            this.navCtrl.navigateRoot('/docente')
          }
        });

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
