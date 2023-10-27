import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from 'src/app/services/firestore.service';
import { map } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  userData: any;
  users: any;
  userList: any[];


  //variable que almacena los datos del ususaio
  user: any;

  constructor(
    public authService : AuthenticationService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private service: ApiService) { }

  ngOnInit() {
    this.leerUSer();
    //obtener lista de user de la pai
    this.service.getUsers().subscribe((data) => {
      this.userList =data;

      //compara el uid estraido con el amacenado
      this.userList.forEach((user)=>{
        //este es uid almacenado en capacitor
        const uid = user.uid;
        if(this.userData && this.userData.uid === uid){
          this.userData = user;
        }
      })
    })


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

  //trae los datos del capcitor que estsan almacenados
  async leerUSer(){
    const response  = await Preferences.get({key:'user'});
    if(response.value){
      this.userData = JSON.parse(response.value);
      //me trae el id del usuario
      const idUser = this.userData.uid;
      // console.log(idUser);
    }
  }
}
