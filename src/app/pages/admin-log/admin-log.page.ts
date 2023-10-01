import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';


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
    private firestore: AngularFirestore,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  //login con rol de admin
  async login(){
    if(this.form.valid){
      try{
        const {email, password} = this.form.value;
        await this.afAuth.signInWithEmailAndPassword(email,password);
        //obtener datos del user autenticado
        const user = await this.afAuth.currentUser;

        //hacer consulta para obtener datos del usuario
        if(user){
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
              if(userType === 'admin'){
                // Redirige al usuario después de iniciar sesión
                this.navCtrl.navigateRoot('/admin');
              }else{
                console.log('No tiene rol de admin ');
                //mensaje que dice que no tiene rol de administrador
                this.presentToast('No tienes el rol de ADMIN para ingresar');
              }
            }else{
              console.log('Entro al otro N|2');
            }
          });
        }
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

  //mensaje de error
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración en milisegundos (2 segundos)
      position: 'top' // Posición en el centro de la pantalla
    });
    toast.present();
  }

}
