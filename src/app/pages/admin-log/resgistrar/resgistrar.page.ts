import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/firestore.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-resgistrar',
  templateUrl: './resgistrar.page.html',
  styleUrls: ['./resgistrar.page.scss'],
})
export class ResgistrarPage implements OnInit {
  //
  formR: FormGroup;

  constructor(
    public authService : AuthenticationService,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private toastController: ToastController,
    public router: Router,
    private loadingController: LoadingController
  ) {
    this.formR = this.fb.group({
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      rut: ['',[Validators.required]],
      dv: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      phone: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      tipo: ['',[Validators.required]],
    })
  }

  ngOnInit() {
  }

   //metodo de registrar usuarios nuevos en la base de datos para
  async registrar() {

    //mostrara el simbolo de cargando
    const loading = await this.loadingController.create({
      message: 'Registrando', // Mensaje que se mostrará junto al spinner
      duration: 5000, // Duración máxima en milisegundos (5 segundos)
      translucent: true, // Hace que el fondo sea translúcido
      backdropDismiss: false, // Evita que el usuario cierre la carga tocando fuera de ella
    });
    await loading.present();

    const {nombre, apellido, rut, dv, email, password,phone,direccion,tipo} = this.formR.value;

    try{
      //registrar al usuario
      const useCredential = await this.afAuth.createUserWithEmailAndPassword(email,password);

      //obtener uid del usuario registrado
      const userUid = useCredential.user.uid;

      //agregar la informacion a Firestore
      await this.afStore.collection('usuarios').doc(userUid).set({
        nombre: nombre,
        apellido: apellido,
        rut: rut,
        dv: dv,
        email: email,
        password: password,
        phone: phone,
        direccion: direccion,
        tipo: tipo
      })
      // Restablecer los valores del formulario
      this.formR.reset();
      this.presentToast('Registro exitoso',3000);
      // this.router.navigate(['/admin'])
      await loading.dismiss();

    }
    catch(error){
      this.presentToast('Se produjo un error, no se pudo registrar al usuario',3000);
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
