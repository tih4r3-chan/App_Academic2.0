import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-cuenta-d',
  templateUrl: './cuenta-d.page.html',
  styleUrls: ['./cuenta-d.page.scss'],
})
export class CuentaDPage implements OnInit {

  //usuarios es un lista de datos de usuarios en duro para mostrar
  userData: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.recuperarDatosUSer().then((userData) => {
      this.userData = userData;
    });
  }

}
