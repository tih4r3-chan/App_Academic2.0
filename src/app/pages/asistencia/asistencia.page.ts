import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { Asistencia } from 'src/app/models/asistencia';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistenciaList: Asistencia[];
  asistenciaLista: Asistencia[];
  userData: any;
  userList: any[];
  asis: any;
  coincide: any;

  asistio: any;


  constructor(
    private apiService: ApiService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.verAsistencia();
  }

  //mostrar la sistencia correspondiente
  async verAsistencia() {
    //traigo el user almacenado en capacitos(solo tiene id y emil)
    const response  = await Preferences.get({key:'user'});
    if(response.value){
      this.userData = JSON.parse(response.value);
    }
    //obtener lista de user de la api(le paso a userData todo los datos que estan en la api)
    this.apiService.getUsers().subscribe((data) => {
      this.userList = data;
      //compara el uid extraido con el amacenado
      const usuarioEncontrado = this.userList.find((user) => user.uid === this.userData.uid);
      if(usuarioEncontrado){
        this.userData = usuarioEncontrado;
      }
    })

    //me traigo las asistencias
    this.apiService.getAsistencia().subscribe((asistencia) =>{
      this.asistenciaList = asistencia;
      this.asis = asistencia;
      //ordenar de mayor a menor(del mas reciente al mas antiguo)
      this.asistenciaList.sort((a ,b) => a.fecha.localeCompare(b.fecha));
      //id user
      const idUserClass = this.userData.claseId;
      //clas id de asistencia, trae todas  las que coinciden
      const coincidencia = this.asistenciaList.filter((data:any) => data.claseId === idUserClass);
      if(coincidencia){
        //con esto muestro los datos que no estan en la,lista
        // this.asis = coincidencia;
        for(let i = 0; i < this.asis.length; ++i){
          //constante que busca la coincidencia de clase id
          const coincide2 = this.asistenciaList.find((data:any) => data.claseId === idUserClass);
          if(coincide2){
            //creo una constante que almacena el id del deoc
            const idAsis = coincide2.id;
            //traigo de firebase(ya que de potro modo no me funciono)
            this.firestore.collection('asistencia').doc(idAsis).get().subscribe((dat)=>{
            if(dat.exists){
              const asistencia = dat.data() as Asistencia; //constante que almacen el data de la asistencia
              const listaA = asistencia.listaA; //almaceno la listaA
              const idUser = this.userData.uid; // traigo el id del usuario logeado
              //creo una constante que buscara si el id e user concide con alumno 1 o 2
              const findAlum = listaA.find(alumnos => alumnos.mapValue.fields.id.stringValue === idUser);
              this.asistio = findAlum;
            }
          })
          }
        }
      }
    });
  }
}
