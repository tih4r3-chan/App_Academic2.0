import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-olvide-password',
  templateUrl: './olvide-password.page.html',
  styleUrls: ['./olvide-password.page.scss'],
})
export class OlvidePasswordPage implements OnInit {
  // crear fromulario
  form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private loadingController: LoadingController
  ) {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      rut: ['',[Validators.required]]
    })
  }

  ngOnInit() {
  }

  //crear el metodo para recuperar
  async recuperar() {
    try{
      if(this.form.valid){
        const {email, rut} = this.form.value;

      //   //hacer cionsulta a firestore, buscar documenteo que coincida con los campos ingresados
      //   const querySnapshot = await this.firestore
      //   .collection('usuarios')
      //   .where('email','==', email)
      //   .where('rut','==',rut)
      //   .get();

      //   //verificar si se encontro un documento}
      //   if(!querySnapshot.empty){
      //     //recuperrar la password
      //     const userDoc = querySnapshot.docs[0].data();
      //     //traer la contraseña y almacenarla
      //     const password = userDoc.password;

      //     //mostrar la contraseña
      //     const alert = await this.alertController.create({
      //       header: 'Recuperación de Contraseña',
      //       message: `Tu contraseña es: ${password}`,
      //       buttons: ['Listo'],
      //     });
      //     await alert.present();
      //     this.navCtrl.navigateRoot('/log-in');
      //   }
      }
    }
    catch(error){
      console.log(error)
    }
  }

}
