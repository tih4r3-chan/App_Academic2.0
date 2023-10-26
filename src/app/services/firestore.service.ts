import { Injectable, NgZone } from '@angular/core'
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  //api

    //inicializar UserData cono any
  userData: any;

  //preference de capacitor
  dataUser: any = {};

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private toastController: ToastController
  ) {
    //verifica que el usuario este autenticado, se suscribe a los cambios de autenticacion del user
    // this.ngFireAuth.authState.subscribe((user) => {
    //   // aca se compreba que el user sera valido
    //   if (user) {
    //     //si es valido se le asigna un objeto user, almacena
    //     this.userData = user;
    //     // se  almacena en localStorage
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user') || '{}');
    //   } else {
    //     localStorage.setItem('user', null || '{}');
    //     JSON.parse(localStorage.getItem('user') || '{}');
    //   }
    // });

    //usando preference
    this.ngFireAuth.authState.subscribe((usuario) => {
      if(usuario){
        const user = this.ngFireAuth.currentUser;
        if(user){
          this.dataUser = usuario;

          //almacenar en preference
          Preferences.set({
            key: 'dataUser',
            value: JSON.stringify(this.dataUser),
          });
        }
        // console.log(this.dataUser,'console log del dataUser');
      }else{
        console.log('Es null');
      }
    })
  }

  // 1metodo para registrar nuevos correo en el Auth
  RegisterUser(email: any, password: any) {
    //se crea una instancia de AngualrFireAuth y luego se registra un nuevo correo
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }


  // almacenar usuario en localStorage
  SetUserData(user: any) {
    //se crea una cosntante que hace referencia al documento de Firestore
    //accede a los usuarios y se accede a los usuarios mediante uid
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `usuarios/${user.uid}`
    );
    //se crea un objeto que tiene los campos del usuaro interface
    const userData: User = {
      uid: user.uid,
      apellido: user.apellido,
      direccion: user.direccion,
      dv: user.dv,
      email: user.email,
      nombre: user.nombre,
      password: user.password,
      phone: user.phone,
      rut: user.rut,
      tipo: user.tipo,
      claseId: user.claseId
    };
    //
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Cerrar sesion uwu
  async SignOut() {
    try{
      //cerra sesion
      await this.ngFireAuth.signOut();
      //eliminar el user del localStorage
      localStorage.removeItem('User');
      //redireccionamiento
      this.router.navigate(['/home']);
      //mensaje
      this.presentToast('Sesión cerrada con exito',3000);

    }
    catch(error){
      console.log(error);
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
