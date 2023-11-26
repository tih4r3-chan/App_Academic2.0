import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';
import { Asistencia } from 'src/app/models/asistencia';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistenciaList: Asistencia[];
  // userData: any;
  userList: any[];
  asis: any;
  lista: any;
  asistio: any;

  asistenciasUsuario: Asistencia[];
  userData: any;


  constructor(
    private apiService: ApiService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.verAsistencia();
  }

  // Función para mostrar el estado de asistencia en el HTML
  async mostrarEstadoAsistencia() {
    // Obtener el alumnoId del usuario logeado desde Capacitor Preference
    const response  = await Preferences.get({key:'user'});
    if(response.value){
      this.userData = JSON.parse(response.value);
    }
    const alumnoIdLogeado = this.userData.uid;

    // Recorrer las asistencias y mostrar el estado de asistio si el alumnoId coincide
      this.firestore.collection('asistencia').get().subscribe(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        console.log(data);
      
        if (Array.isArray(data) && data.length > 0) {
          // Iterar sobre el arreglo interno
          data[0].forEach(asistenciaItem => {
            // Verificar si la listaA existe y tiene elementos
            if (asistenciaItem.listaA && asistenciaItem.listaA.length > 0) {
              // Buscar el alumnoId en la listaA
              const alumnoEnLista = asistenciaItem.listaA.find(alumno => alumno.asistio && alumno.id && alumno.id.mapValue.fields.stringValue === alumnoIdLogeado);
            
              if (alumnoEnLista) {
                // El alumno está en la listaA, ahora puedes acceder a su estado de asistio
                const asistio = alumnoEnLista.asistio.mapValue.fields.stringValue;
              
                // Mostrar el estado de asistio en tu HTML o realizar la lógica que desees
                console.log(`El alumno asistió: ${asistio}`);
              }
            }
          });
        }
      });
    });
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
    this.apiService.getAsistencia().subscribe((asistencias) =>{
      this.asis = asistencias.filter(item => item.claseId === this.userData.claseId)
      const lista = this.asis.map((item:any) => item.listaA)

      this.lista = lista.map((user:any) => {
        const id = user.id;
        const nombre = user.nombre;
        const asistio = user.asistio;
        return {
          id,
          nombre,
          asistio
        };
      })
      console.log(lista)
    });
  }

}
