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


    //mensaje uwu
    async mostrarMensaje() {
      const toast = await this.toastController.create({
        message: 'Error, tu tipo de usuario no te permite ingresar a acá',
        duration: 3000, // Duración en milisegundos (en este caso, 3 segundos)
        position: 'bottom' // Puedes ajustar la posición del mensaje (top, bottom, middle)
      });

      toast.present();
    }

  //crear metodos y funciones de auth
  async logearAdmin(){
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
                console.log('Si entro')
              }
            }else{
              console.log('Entro al otro N|2')
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
}
