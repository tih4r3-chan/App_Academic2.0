import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //inicializar UserData cono any
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    //verifica que el usuario este autenticado, se suscribe a los cambios de autenticacion del user
    this.ngFireAuth.authState.subscribe((user) => {
      // aca se compreba que el user sera valido
      if (user) {
        //si es valido se le asigna un objeto user, almacena
        this.userData = user;
        // se  almacena en localStorage
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', null || '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }

  // 1metodo para registrar nuevos correo en el Auth
  RegisterUser(email: any, password: any) {
    //se crea una instancia de AngualrFireAuth y luego se registra un nuevo correo
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Enviar email al nuevo registrado
  async SendVerificationMail(){
    //se obtiene al user  autenticado(promesa), cuando se devuelvela promesa se proporciona el user actual
    return this.ngFireAuth.currentUser.then((user: any) => {
      //ya se obtuvo al user, se envia un correo verificando su correo
      return user.sendEmailVerification().then(() => {
        //una vez se halla enviado el correo, se redirigue al login
        this.router.navigate(['log-in']);
      });
    });
  }

  // recuperrar la password
  async PasswordRecover(passwordResetEmail: any) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Se ha enviado un correo electrónico para restablecer la contraseña, revise su bandeja de entrada.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
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
      email: user.email,
      password: user.password,
      name: user.name,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    //
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Cerrar sesion uwu
  async SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/home']);
    });
  }
}
