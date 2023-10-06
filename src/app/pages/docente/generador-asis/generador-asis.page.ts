import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-generador-asis',
  templateUrl: './generador-asis.page.html',
  styleUrls: ['./generador-asis.page.scss'],
})
export class GeneradorAsisPage implements OnInit {

  constructor(
    private fireService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  //metodo para crear documento Asistencia
  //datos que se ingresaran
  crearDoc(){
    const datos = {
      idSeccion: 'D-001',
      idClase: 1,
      Alumno1:{
        id: 'LE1b90lDV8aYNzpYh1hZpYr76OF2',
        estado: false
      },
      Alumno2: {
        id: 'VTSIfq3yv2Y0QHMknt4rkCOxD772',
        estado:false
      }
    };

    //llamar la coleccion
    const coleccion = 'asistencia';

    this.fireService.crearDoc(coleccion,datos)
    .subscribe(
      (response) => {
        //mensaje de que si se creo el documento
        console.log('Se creo el documento', response)
      }
    )
  };

}
