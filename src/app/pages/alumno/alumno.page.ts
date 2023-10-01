import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/firestore.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  //variable que almacena los datos del ususaio
  user: any;

  constructor(private alertController: AlertController,
    private navCtrl: NavController,
    public authService : AuthenticationService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  ngOnInit() {
    // obtener usuario autenticado
    this.auth.authState.subscribe(async (user) =>{
      if(user){
        //usuario autenticado
        this.user = user;

        //consultar a firestore para obtener los datos del usuario
        this.firestore
        .collection('usuarios')
        .doc(user.uid)
        .get()
        .pipe(
          map((doc) =>{
            if(doc.exists){
              //transformar el documento en un objeto de datos
              const userData = doc.data();
              return{ id: doc.id, nombre:(doc.data() as any).nombre, apellido:(doc.data() as any).apellido, email: (doc.data() as any).email, rut: (doc.data() as any).rut,
              dv: (doc.data() as any).dv, direccion: (doc.data() as any).direccion, phone: (doc.data() as any).phone, tipo: (doc.data() as any).tipo}
            }else{
              return null;
            }
          })
        )
        .subscribe((userData) =>{
          if(userData){
            this.user.data = userData;
          }
        })
      }
    })
  }

}
